import { ReactNode } from "react";

export interface AllPatientsTableColumn<T> {
  key: string;
  title: string;
  width: number;
  render?: (props: { report: T; isSelected: boolean }) => ReactNode;
}
