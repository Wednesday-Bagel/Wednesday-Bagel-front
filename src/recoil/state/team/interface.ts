import { QueryStatus } from "react-query";

export type Result = {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  detail: string;
  tip: string;
  perfectMatch: string;
  badMatch: string;
  questionResultImageName: string;
};

export type TeamResult = {
  id: number;
  teamCode: string;
  teamName: string;
  resultDtos: Result[];
};

export type TeamResultState = {
  status: QueryStatus;
  data: TeamResult | null;
};

export type TeamInfo = {
  teamName: string;
  teamCode: string;
};
