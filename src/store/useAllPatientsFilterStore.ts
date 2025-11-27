import { create } from "zustand";

enum SortBy {
  NAME = "name",
  REPORT_CREATED_DATE = "reportCreatedDate",
}

enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

interface AllPatientsFilterState {
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: string) => void;
  clearSearchKeyword: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  sortOrder: SortOrder;
  setSortOrder: (sortOrder: SortOrder) => void;
}

const useAllPatientsFilterStore = create<AllPatientsFilterState>((set) => ({
  searchKeyword: "",
  setSearchKeyword: (searchKeyword: string) => set({ searchKeyword }),
  clearSearchKeyword: () => set({ searchKeyword: "" }),

  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),

  rowsPerPage: 20,
  setRowsPerPage: (rowsPerPage: number) => set({ rowsPerPage }),

  sortBy: SortBy.NAME,
  setSortBy: (sortBy: SortBy) => set({ sortBy }),

  sortOrder: SortOrder.ASC,
  setSortOrder: (sortOrder: SortOrder) => set({ sortOrder }),
}));

export { useAllPatientsFilterStore };
