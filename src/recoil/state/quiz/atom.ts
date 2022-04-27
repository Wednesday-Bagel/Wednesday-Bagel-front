import { QuizNew } from "./interface";
import { QueryStatus } from "react-query";
import { atom, AtomEffect } from "recoil";
import { recoilPersist } from "recoil-persist";

type RecoilPersist<T> = {
  persistAtom: AtomEffect<T>;
};

export const quizStatusAtom = atom<QueryStatus>({
  key: "quizStatusAtom",
  default: "idle",
});

export const quizDataAtom = atom<QuizNew[] | null>({
  key: "quizDataAtom",
  default: null,
});

const { persistAtom: persistQuizAnswerAtom } = recoilPersist({
  key: "recoil-persist-quizAnswer",
}) as RecoilPersist<QuizNew[] | null>;
export const quizAnswerAtom = atom<QuizNew[] | null>({
  key: "quizAnswerAtom",
  default: null,
  effects_UNSTABLE: [persistQuizAnswerAtom],
});
