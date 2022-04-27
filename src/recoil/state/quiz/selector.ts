import { selector } from "recoil";
import { quizDataAtom, quizStatusAtom } from "./atom";
import { QuizState } from "./interface";

export const quizSelector = selector<QuizState>({
  key: "quizStateSelector",
  get: ({ get }) => {
    return {
      status: get(quizStatusAtom),
      data: get(quizDataAtom),
    };
  },
});
