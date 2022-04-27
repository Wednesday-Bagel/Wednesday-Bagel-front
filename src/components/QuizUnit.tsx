import _ from "lodash";
import { FC, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { api_ } from "../plugins/axios";
import {
  individualResultAtom,
  participantInfoAtom,
  progressAtom,
} from "../recoil/quiz";
import { quizAnswerAtom, QuizNew, teamInfoAtom } from "../recoil/state";

interface Props {
  order: number;
  quiz: QuizNew; //Quiz
  quizNum: number;
}

export const QuizUnit: FC<Props> = function QuizUnit({
  order,
  quiz,
  quizNum,
}: Props) {
  const [searchParams] = useSearchParams();
  const paramString = searchParams.toString();

  const setProgress = useSetRecoilState(progressAtom);

  const [quizAnswer, setQuizAnswer] = useRecoilState(quizAnswerAtom);

  const participantInfo = useRecoilValue(participantInfoAtom);

  const [choiceNumber, setChoiceNumber] = useState<number | undefined>(
    quiz.choiceNum
  );
  const teamInfo = useRecoilValue(teamInfoAtom);

  const setIndividualResult = useSetRecoilState(individualResultAtom);

  const navigate = useNavigate();

  const onNextClick = () => {
    if (quizAnswer) {
      const tempAnswerList = quizAnswer.slice();
      const quizWithAnswer = {
        ...tempAnswerList[order - 1],
        choiceNum: choiceNumber,
      };
      tempAnswerList.splice(order - 1, 1, quizWithAnswer);
      setQuizAnswer(tempAnswerList);
      setChoiceNumber(quizAnswer[order].choiceNum);
    } else {
      throw new Error("quiz answer error");
    }
    // 다음 문제를 위해
    setProgress(order);
  };

  const onSubmit = async () => {
    if (quizAnswer) {
      const tempAnswerList = quizAnswer.slice();
      const quizWithAnswer = {
        ...tempAnswerList[order - 1],
        choiceNum: choiceNumber,
      };
      tempAnswerList.splice(order - 1, 1, quizWithAnswer);
      setQuizAnswer(tempAnswerList);

      const teamCode = teamInfo?.teamCode;
      const answerArr = tempAnswerList.map((item) => {
        return item.choiceNum;
      });
      const answerSubmit = {
        name: participantInfo.name,
        teamName: teamInfo?.teamName,
        teamCode: teamInfo?.teamCode,
        answers: answerArr,
      };

      try {
        const result = await api_.post(
          `/test${_.isUndefined(teamCode) ? "" : `?teamCode=${teamCode}`}`,
          answerSubmit
        );
        setIndividualResult(result.data);
      } catch (err: any) {
        alert("답안 제출에 실패하였습니다 다시 시도 해주세요");
      }

      setChoiceNumber(undefined);
      setProgress(0);
      navigate(`/result/?${paramString}`);
    }
  };

  const answerChoiceButton = (answerChoice: string, index: number) => {
    return (
      <label>
        <div className="flex items-center gap-4 border p-2 bg-blue-50 border-blue-700 text-blue-700">
          <div className="pl-1 flex items-center">
            <input
              type="radio"
              className="w-4 h-4"
              name={`quiz-${order}`}
              checked={index === choiceNumber}
              onChange={(e: any) => {
                if (e.target.checked) {
                  setChoiceNumber(index);
                }
              }}
            />
          </div>
          <p>{answerChoice}</p>
        </div>
      </label>
    );
  };

  return (
    <div className="px-4 py-8 space-y-8 sm:border">
      <p className="text-lg font-medium">
        <span className="text-base text-blue-700">{order + "➜"}</span>{" "}
        <span>{quiz.question}</span>
      </p>
      <div className="space-y-2 px-6">
        <div>{answerChoiceButton(quiz.answerChoice1, 0)}</div>
        <div>{answerChoiceButton(quiz.answerChoice2, 1)}</div>
      </div>
      <div className="flex justify-end gap-4">
        {order >= 2 && (
          <button
            onClick={() => {
              if (order >= 2) {
                setProgress(order - 2);
                if (quizAnswer) {
                  setChoiceNumber(quizAnswer[order - 2].choiceNum);
                }
              }
            }}
            className="bg-gray-600 h-10 px-8 text-white rounded-md hover:bg-gray-400 transition-colors duration-150 ease-out"
          >
            이전
          </button>
        )}
        {quizNum > order ? (
          <button
            onClick={onNextClick}
            disabled={_.isUndefined(choiceNumber)}
            className="bg-blue-700 h-10 px-8 text-white rounded-md hover:bg-blue-500 transition-colors duration-150 ease-out disabled:opacity-50"
          >
            다음
          </button>
        ) : (
          <button
            onClick={onSubmit}
            disabled={_.isUndefined(choiceNumber)}
            className="bg-blue-700 h-10 px-8 text-white rounded-md hover:bg-blue-500 transition-colors duration-150 ease-out disabled:opacity-50"
          >
            결과보기
          </button>
        )}
      </div>
    </div>
  );
};
