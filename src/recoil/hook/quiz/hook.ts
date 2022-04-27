import { quizStatusAtom, quizDataAtom } from "./../../state/quiz/atom";
import { fetcher } from "./../../../plugins/fetcher";
import { useRecoilQuery } from "../../../plugins/recoil-query";

export const useQuizHook = function () {
  useRecoilQuery(quizStatusAtom, quizDataAtom, "test", fetcher);
};
