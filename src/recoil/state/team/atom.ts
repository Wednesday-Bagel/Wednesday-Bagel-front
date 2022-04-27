import { QueryStatus } from "react-query";
import { atom, atomFamily } from "recoil";
import { TeamInfo, TeamResult } from "./interface";

export const teamResultStatusAtomFamily = atomFamily<QueryStatus, string>({
  key: "teamResultListStatusAtomFamily",
  default: "idle",
});

export const teamResultDataAtomFamily = atomFamily<TeamResult | null, string>({
  key: "teamResultListDataAtomFamily",
  default: null,
});

export const teamInfoAtom = atom<TeamInfo | null>({
  key: "teamInfoAm",
  default: null,
});
