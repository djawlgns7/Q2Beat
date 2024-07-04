package org.bit.model.Q2Notice;

public class Pagination {
    private int currentPage;    // 현재 페이지
    private int pageSize;       // 한 페이지에 표시할 항목 수
    private int totalPages;     // 전체 페이지 수
    private int totalCount;     // 전체 항목 수
    private int startPage;      // 시작 페이지 번호
    private int endPage;        // 끝 페이지 번호

    private int blockSize;      // 한 번에 표시할 페이지 번호 수

    //현재 페이지, 페이지 범위, 게시글 항목 수를 블록크기 기반으로 페이지네이션 정보를 초기화
    public Pagination(int currentPage, int pageSize, int totalCount) {
        this(currentPage, pageSize, totalCount, 5); // 기본 블록 크기를 5로 설정
    }

    public Pagination(int currentPage, int pageSize, int totalCount, int blockSize) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.totalCount = totalCount;
        this.blockSize = blockSize;
        initialize();
    }

    // 페이지네이션 정보 초기화
    private void initialize() {
        this.totalPages = (int) Math.ceil((double) totalCount / pageSize);
        updatePageBlock();
    }

    //현재 페이지 -> 반환
    public int getCurrentPage() {
        return currentPage;
    }
    //현재 페이지를 설정하고 페이지 블록을 업데이트
    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
        updatePageBlock();
    }
    //한 페이지에 표시할 항목 수 반환
    public int getPageSize() {
        return pageSize;
    }
    //한 페이지에 표시할 항목 수를 설정하고 전체 페이지 수와 페이지 블록 업데이트
    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
        initialize();
    }
    //전체 항목 수 -> 반환
    public int getTotalCount() {
        return totalCount;
    }
    //전체 항목 수를 설정하고 전체 페이지 수와 페이지 블록을 업데이트
    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
        initialize();
    }
    //전체 페이지 -> 반환
    public int getTotalPages() {
        return totalPages;
    }
    //현재 페이지 블록의 시작 페이지 번호를 반환
    public int getStartPage() {
        return startPage;
    }

    public void setStartPage(int startPage) {
        this.startPage = startPage;
    }

    //현재 페이지 블록의 끝 페이지 번호를 반환
    public int getEndPage() {
        return endPage;
    }

    public void setEndPage(int endPage) {
        this.endPage = endPage;
    }

    //현재 페이지 기준으로 페이지 블록 업데이트
    //페이지 블록 사이즈 만큼 페이지 번호 표시
    private void updatePageBlock() {
        this.startPage = ((currentPage - 1) / blockSize) * blockSize + 1;
        this.endPage = Math.min(startPage + blockSize - 1, totalPages);
    }
}
