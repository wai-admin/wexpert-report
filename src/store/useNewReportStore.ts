import { create } from "zustand";
import { ImageExportOptionValues } from "@/types";

interface NewReportState {
  imageExportOption: ImageExportOptionValues;
  setImageExportOption: (option: ImageExportOptionValues) => void;
  physicianAssessment: string;
  setPhysicianAssessment: (assessment: string) => void;
}

export const useNewReportStore = create<NewReportState>((set) => ({
  imageExportOption: ImageExportOptionValues.ALL_IMAGE,
  physicianAssessment: "",
  setImageExportOption: (option: ImageExportOptionValues) => {
    set({ imageExportOption: option });
  },
  setPhysicianAssessment: (assessment: string) => {
    set({ physicianAssessment: assessment });
  },
}));
