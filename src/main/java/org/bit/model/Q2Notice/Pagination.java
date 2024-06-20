package org.bit.model.Q2Notice;

public class Pagination {
    private int currentPage;    // 현재 페이지
    private int pageSize;       // 한 페이지에 표시할 항목 수
    private int totalPages;     // 전체 페이지 수
    private int totalCount;     // 전체 항목 수
    private int startPage;      // 시작 페이지 번호
    private int endPage;        // 끝 페이지 번호

    private static final int BLOCK_SIZE = 5;  // 한 번에 표시할 페이지 번호 수

    //현재 페이지, 페이지 범위, 게시글 항목 수를 기반으로 페이지네이션 정보를 초기화
    public Pagination(int currentPage, int pageSize, int totalCount) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.totalCount = totalCount;
        this.totalPages = (int) Math.ceil((double) totalCount / pageSize);
        //현재 페이지가 속한 페이지 블록의 시작 페이지와 끝 페이지 계산
        this.startPage = ((currentPage - 1) / BLOCK_SIZE) * BLOCK_SIZE + 1;
        this.endPage = Math.min(startPage + BLOCK_SIZE - 1, totalPages);
    }

    //현재 페이지 -> 반환
    public int getCurrentPage() {
        return currentPage;
    }
    //현재 페이지를 기준으로 페이지 블록 업데이트
    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage; //현재 페이지 번호
        updatePageBlock();
    }
    //페이지 표시할 항목 수
    public int getPageSize() {
        return pageSize;
    }
    //한 페이지에 표시할 항목 수를 설정하고 전체 페이지 수와 페이지 블록 업데이트
    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
        this.totalPages = (int) Math.ceil((double) totalCount / pageSize);
        updatePageBlock();
    }
    //전체 항목 수 -> 반환
    public int getTotalCount() {
        return totalCount;
    }
    //전체 페이지 수 -> 반환
    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
        this.totalPages = (int) Math.ceil((double) totalCount / pageSize);
        updatePageBlock();
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public int getStartPage() {
        return startPage;
    }

    public int getEndPage() {
        return endPage;
    }

    private void updatePageBlock() {
        this.startPage = ((currentPage - 1) / BLOCK_SIZE) * BLOCK_SIZE + 1;
        this.endPage = Math.min(startPage + BLOCK_SIZE - 1, totalPages);
    }
}
