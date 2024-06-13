package org.bit.handler;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class MyWebSocketHandler extends TextWebSocketHandler {

    private final Map<String, Set<WebSocketSession>> rooms = new ConcurrentHashMap<>();
    private final Map<WebSocketSession, String> sessionRoomMap = new ConcurrentHashMap<>();
    private final Map<WebSocketSession, String> sessionNameMap = new ConcurrentHashMap<>();


    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // No action needed on initial connection
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        String[] parts = payload.split(":", 2);
        String command = parts[0];
        String content = parts[1];

        if ("CREATE".equals(command)) {
            String roomId = generateRoomId();
            rooms.put(roomId, ConcurrentHashMap.newKeySet());
            rooms.get(roomId).add(session);
            sessionRoomMap.put(session, roomId);
            sessionNameMap.put(session, content);
            session.sendMessage(new TextMessage("ROOMID:" + roomId));
        } else if ("JOIN".equals(command)) {
            String[] msgParts = content.split(":", 3);
            String personType = msgParts[0];
            String roomId = msgParts[1];
            String playerName = msgParts[2];
            if (rooms.containsKey(roomId)) {
                rooms.get(roomId).add(session);
                sessionRoomMap.put(session, roomId);
                sessionNameMap.put(session, playerName);
                session.sendMessage(new TextMessage("JOINED:" + roomId));
                if (personType.equals("PLAYER")) {
                    broadcast(roomId, "NEWMEMBER:" + playerName);
                }
            } else {
                session.sendMessage(new TextMessage("ERROR:Room not found"));
            }
        } else if ("START".equals(command)) {
            String[] msgParts = content.split(":", 2);
            String roomId = msgParts[0];
            String gameType = msgParts[1];

            broadcast(roomId, "START:" + gameType);
        } else if ("MESSAGE".equals(command)) {
            String[] msgParts = content.split(":", 2);
            String roomId = msgParts[0];
            String chatMessage = msgParts[1];
            broadcast(roomId, chatMessage);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String roomId = sessionRoomMap.get(session);
        String playerName = sessionNameMap.get(session);

        if (roomId != null) {
            Set<WebSocketSession> sessions = rooms.get(roomId);
            if (sessions != null) {
                // 세션이 닫히기 전에 알림을 보냄
                try {
                    broadcast(roomId, "USERLEFT:" + playerName);
                } catch (Exception e) {
                    System.err.println("Failed to broadcast USERLEFT message: " + e.getMessage());
                }
                // 세션 제거
                sessions.remove(session);
                sessionRoomMap.remove(session);
                sessionNameMap.remove(session);
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

    private String generateRoomId() {
        return String.valueOf((int) (Math.random() * 100000 + 1));
    }
}
