import { QueryStatus } from "react-query";

export type QuizNew = {
  id: number;
  question: string;
  answerChoice1: string;
  answerChoice2: string;
  choiceNum?: number;
};

export type QuizState = {
  status: QueryStatus;
  data: QuizNew[] | null;
};
