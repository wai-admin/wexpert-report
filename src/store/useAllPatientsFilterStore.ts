import { create } from "zustand";

export enum SortBy {
  NAME = "Name",
  REPORT_CREATED_DATE = "Report created",
}

export enum SortOrder {
  ASC = "Ascending",
  DESC = "Descending",
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
  setSearchKeyword: (searchKeyword: string) =>
    set({ searchKeyword, currentPage: 1 }),
  clearSearchKeyword: () => set({ searchKeyword: "", currentPage: 1 }),

  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),

  rowsPerPage: 20,
  setRowsPerPage: (rowsPerPage: number) => set({ rowsPerPage, currentPage: 1 }),

  sortBy: SortBy.NAME,
  setSortBy: (sortBy: SortBy) => set({ sortBy, currentPage: 1 }),

  sortOrder: SortOrder.ASC,
  setSortOrder: (sortOrder: SortOrder) => set({ sortOrder, currentPage: 1 }),
}));

export { useAllPatientsFilterStore };
