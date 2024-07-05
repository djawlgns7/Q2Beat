package org.bit.model.Q2Notice;

public class Pagination {
    private int currentPage; //현재 페이지
    private int pageSize; //현재 페이지의 크기(표시할 항목 수)
    private int totalPages; //전체 페이지
    private int totalCount; //전체 항목 수
    private int startPage; //현재 페이지 블록의 시작 페이지
    private int endPage; //현재 페이지 블록의 끝 페이지

    private int blockSize; //페이지 블록 크기(한 줄에 표시될 페이지 번호 수)

    //기본 생성자 = Pagination은 현 페이지, 현 페이지 크기, 표시할 항목 수 담겨있는 객체(블록은 정수값 처리)
    //블록 사이즈는 5
    //즉, 1~5 -> 6~10 -> 11~15 방식의 페이징
    public Pagination(int currentPage, int pageSize, int totalCount) {
        this(currentPage, pageSize, totalCount, 5); // 기본 블록 크기를 5로 설정
    }

    //전체 생성자 = Pagination은 페이지네이션의 정보 초기화, 전체 페이지를 계산해서 페이지블록 업데이트
    public Pagination(int currentPage, int pageSize, int totalCount, int blockSize) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.totalCount = totalCount;
        this.blockSize = blockSize;
        initialize(); //페이지 초기화 메소드 호출
    }

    // 페이지 초기화 메소드
    private void initialize() {
        this.totalPages = (int) Math.ceil((double) totalCount / pageSize);
        updatePageBlock();
        //totalPages와 pageSize 2개의 int를 나눈 뒤 Math.ceil((double)을 이용해서
        //나눈 소수점 값을 가장 가까운 정수로 반올림하여 반환
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
        initialize(); //전체 페이지 수와 페이지 블록을 재계산
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
    //전체 페이지 수 -> 반환
    public int getTotalPages() {
        return totalPages;
    }
    //현재 페이지 블록의 시작 페이지 번호를 반환
    public int getStartPage() {
        return startPage;
    }
    //현재 페이지 블록의 시작 페이지 번호를 설정
    public void setStartPage(int startPage) {
        this.startPage = startPage;
    }

    //현재 페이지 블록의 끝 페이지 번호를 반환
    public int getEndPage() {
        return endPage;
    }

    //현재 페이지 블록의 끝 페이지 번호를 설정
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
