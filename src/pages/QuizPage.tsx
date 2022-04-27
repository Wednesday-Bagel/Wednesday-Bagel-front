import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ProgressBar } from "../components/ProgressBar";
import { QuizUnit } from "../components/QuizUnit";
import { participantInfoAtom, progressAtom } from "../recoil/quiz";
import { quizAnswerAtom } from "../recoil/state";

const QuizPage: FC = function QuizPage() {
  const quizAnswer = useRecoilValue(quizAnswerAtom);
  const progress = useRecoilValue(progressAtom);
  const participantInfo = useRecoilValue(participantInfoAtom);
  const viewWidth = window.innerWidth;

  if (participantInfo && quizAnswer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-xl mx-auto space-y-4 bg-white min-h-screen relative">
          <div
            className="fixed top-0 max-w-xl"
            style={{
              width: viewWidth,
            }}
          >
            <ProgressBar quizNum={quizAnswer.length} />
            <div className="text-right pt-2 font-medium text-sm pr-2">
              <p>{participantInfo?.name}님 환영합니다!</p>
            </div>
          </div>
          <div className="flex sm:items-center h-screen">
            <div className="w-full mt-12 sm:mt-0 sm:bg-white">
              <QuizUnit
                order={progress + 1}
                quiz={quizAnswer[progress]}
                quizNum={quizAnswer.length}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/home"></Navigate>;
  }
};

export default QuizPage;
