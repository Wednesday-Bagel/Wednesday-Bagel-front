import { FC } from "react";
import { useRecoilValue } from "recoil";
import { progressAtom } from "../recoil/quiz";
import { LinearProgress } from "@mui/material";

interface Props {
  quizNum: number;
}

export const ProgressBar: FC<Props> = function ProgressBar({ quizNum }: Props) {
  const progress = useRecoilValue(progressAtom);

  return (
    <LinearProgress
      value={((progress + 1) / quizNum) * 100}
      variant="determinate"
      sx={{ height: 16 }}
    />
  );
};
