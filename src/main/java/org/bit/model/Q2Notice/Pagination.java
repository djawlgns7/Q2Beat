package org.bit.model.Q2Notice;

public class Pagination {
    private int currentPage;    // 현재 페이지
    private int pageSize;       // 한 페이지에 표시할 항목 수
    private int totalPages;     // 전체 페이지 수
    private int totalCount;     // 전체 항목 수
    private int startPage;      // 시작 페이지 번호
    private int endPage;        // 끝 페이지 번호

    private static final int BLOCK_SIZE = 5;  // 한 번에 표시할 게시글 번호 수

    public Pagination(int currentPage, int pageSize, int totalCount) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.totalCount = totalCount;
        this.totalPages = (int) Math.ceil((double) totalCount / pageSize);

        this.startPage = ((currentPage - 1) / BLOCK_SIZE) * BLOCK_SIZE + 1;
        this.endPage = Math.min(startPage + BLOCK_SIZE - 1, totalPages);
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
        updatePageBlock();
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
        this.totalPages = (int) Math.ceil((double) totalCount / pageSize);
        updatePageBlock();
    }

    public int getTotalCount() {
        return totalCount;
    }

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
