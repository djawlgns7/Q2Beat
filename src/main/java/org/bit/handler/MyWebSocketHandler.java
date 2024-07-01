package org.bit.handler;

import org.bit.model.Player;
import org.bit.service.PlayerService;
import org.bit.service.RoomService;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class MyWebSocketHandler extends TextWebSocketHandler {
    private final Map<String, Set<WebSocketSession>> rooms = new ConcurrentHashMap<>();
    private final Map<WebSocketSession, String> sessionRoomMap = new ConcurrentHashMap<>();
    private final Map<WebSocketSession, String> sessionNameMap = new ConcurrentHashMap<>();
    private final RoomService roomService;
    private final PlayerService playerService;

    public MyWebSocketHandler(RoomService roomService, PlayerService playerService) {
        this.roomService = roomService;
        this.playerService = playerService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // No action needed on initial connection
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        String[] parts = payload.split(":", 2);
        if (parts.length < 2) {
            System.err.println("Invalid message format: " + payload);
            return;
        }
        String command = parts[0];
        String content = parts[1];

        if ("CREATE".equals(command)) {
            String roomId = generateRoomId();
            String hostName = "(HOST)" + content;
            Player player = new Player("R" + roomId, hostName);
            player.setPlayer_team_id(0);

            rooms.put(roomId, ConcurrentHashMap.newKeySet());
            rooms.get(roomId).add(session);
            sessionRoomMap.put(session, roomId);
            sessionNameMap.put(session, hostName);
            session.sendMessage(new TextMessage("ROOMID:" + roomId));
            playerService.createPlayer(player);
        } else if ("JOIN".equals(command)) {
            String[] msgParts = content.split(":", 3);
            if (msgParts.length < 3) {
                System.err.println("Invalid JOIN message format: " + content);
                return;
            }
            String personType = msgParts[0];
            String roomId = msgParts[1];
            String playerName = msgParts[2];

            if (rooms.containsKey(roomId)) {
                rooms.get(roomId).add(session);
                sessionRoomMap.put(session, roomId);
                sessionNameMap.put(session, playerName);
                session.sendMessage(new TextMessage("JOINED:" + roomId));
                if (personType.equals("PLAYER")) {
                    Player player = new Player("R" + roomId, playerName);

                    broadcast(roomId, "NEWMEMBER:" + playerName);
                    if (playerService.getPlayer(player) == null) {
                        playerService.createPlayer(player);
                    }
                } else if (personType.equals("HOST")) {
                    Player player = new Player("R" + roomId, "(HOST)" + playerName);

                    playerService.createPlayer(player);
                }
            } else {
                session.sendMessage(new TextMessage("ERROR:Room not found"));
            }
        } else if ("START".equals(command)) {
            String[] msgParts = content.split(":", 2);
            if (msgParts.length < 2) {
                System.err.println("Invalid START message format: " + content);
                return;
            }
            String roomId = msgParts[0];
            String gameType = msgParts[1];

            broadcast(roomId, "START:" + gameType);
        } else if ("MESSAGE".equals(command)) {
            String[] msgParts = content.split(":", 2);
            if (msgParts.length < 2) {
                System.err.println("Invalid MESSAGE message format: " + content);
                return;
            }
            String roomId = msgParts[0];
            String chatMessage = msgParts[1];
            broadcast(roomId, chatMessage);
        } else if ("IMAGE".equals(command)) {
            String[] msgParts = content.split(":", 2);
            String roomId = msgParts[0];
            String image = msgParts[1];
            sendHost(roomId, image);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String roomId = sessionRoomMap.get(session);
        String playerName = sessionNameMap.get(session);
        Player player = new Player("R" + roomId, playerName);

        if (roomId != null) {
            Set<WebSocketSession> sessions = rooms.get(roomId);
            if (sessions != null) {
                // 세션이 닫히기 전에 알림을 보냄
                try {
                    broadcast(roomId, "USERLEFT:" + playerName);
                    playerService.deletePlayer(player);
                } catch (Exception e) {
                    System.err.println("Failed to broadcast USERLEFT message: " + e.getMessage());
                }
                // 세션 제거
                sessions.remove(session);
                sessionRoomMap.remove(session);
                sessionNameMap.remove(session);

                if (playerService.getPlayerNumber("R" + roomId) == 0) {
                    roomService.clearRoom("R" + roomId);
                    System.out.println("방 삭제 완료: " + roomId);
                }

                System.out.println("Session removed from room and maps: " + playerName);
            }
        }
    }

    private void broadcast(String roomId, String message) throws Exception {
        if (rooms.containsKey(roomId)) {
            for (WebSocketSession session : rooms.get(roomId)) {
                if (session.isOpen()) {
                    session.sendMessage(new TextMessage(message));
                }
            }
        }
    }

    private void sendHost (String roomId, String message) throws Exception {
        if (rooms.containsKey(roomId)) {
            for (WebSocketSession session : rooms.get(roomId)) {
                String name = sessionNameMap.get(session);

                if (name.startsWith("(HOST)") && session.isOpen()) {
                    session.sendMessage(new TextMessage(message));
                }
            }
        }
    }

    private String generateRoomId() {
        int roomId = (int) (Math.random() * 99999 + 1);

        while (true) {
            if (roomService.createRoom("R" + roomId)) {
                System.out.println("방 생성: " + roomId);
                return String.valueOf(roomId);
            } else {
                System.out.println("방 생성 실패");
                roomId = (int) (Math.random() * 99999 + 1);
            }
        }
    }

}