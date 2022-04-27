import {
  teamResultStatusAtomFamily,
  teamResultDataAtomFamily,
} from "./../../state/team/atom";
import { fetcher } from "./../../../plugins/fetcher";
import { useRecoilQuery } from "../../../plugins/recoil-query";
import _ from "lodash";

export const useTeamResultHook = function (teamCode: string | null) {
  const teamCode_ = teamCode ?? "undefined";
  useRecoilQuery(
    teamResultStatusAtomFamily(teamCode_),
    teamResultDataAtomFamily(teamCode_),
    `/result?team=${teamCode}`,
    fetcher,
    _.isNull(teamCode)
  );
};
