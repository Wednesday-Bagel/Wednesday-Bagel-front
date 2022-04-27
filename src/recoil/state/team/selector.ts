import { selectorFamily } from "recoil";
import { teamResultDataAtomFamily, teamResultStatusAtomFamily } from "./atom";
import { TeamResultState } from "./interface";

export const teamResultSelctorFamily = selectorFamily<TeamResultState, string>({
  key: "teamResultListSelector",
  get:
    (teamCode) =>
    ({ get }) => {
      return {
        status: get(teamResultStatusAtomFamily(teamCode)),
        data: get(teamResultDataAtomFamily(teamCode)),
      };
    },
});
