package org.bit.model.Q2Notice;

public class Pagination {
    private int currentPage;
    private int pageSize;
    private int totalPages;
    private int totalCount;
    private int startPage;
    private int lastPage;

    public Pagination(int currentPage, int pageSize, int totalCount) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.totalCount = totalCount;
        this.totalPages = (int)Math.ceil((double) totalCount / pageSize);

        int blockSize = 5;
        this.startPage = ((currentPage - 1) / blockSize) * blockSize + 1;
        this.lastPage = Math.min(startPage + blockSize - 1, totalPages);
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
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

    public void setStartPage(int startPage) {
        this.startPage = startPage;
    }

    public int getEndPage() {
        return lastPage;
    }

    public void setEndPage(int lastPage) {
        this.lastPage = lastPage;
    }

}
