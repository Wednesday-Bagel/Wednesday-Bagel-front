import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  participantInfoAtom,
  progressAtom,
  teamInfoAtom,
} from "../recoil/quiz";
import {
  quizAnswerAtom,
  quizSelector,
  teamResultSelctorFamily,
} from "../recoil/state";

export default function HomePage() {
  const navigate = useNavigate();
  const quizState = useRecoilValue(quizSelector);
  const [searchParams] = useSearchParams();
  const paramString = searchParams.toString();
  const teamCode = searchParams.get("teamCode");
  const teamCode_ = teamCode ?? "undefined";

  const teamResultState = useRecoilValue(teamResultSelctorFamily(teamCode_));
  const setQuizAnswer = useSetRecoilState(quizAnswerAtom);
  const setProgress = useSetRecoilState(progressAtom);
  const [participantInfo, setParticipantInfo] =
    useRecoilState(participantInfoAtom);
  const setTeamInfo = useSetRecoilState(teamInfoAtom);

  const individualStartClick = useCallback(() => {
    if (quizState.status === "success" && quizState.data) {
      const quizList = quizState.data;
      setProgress(0);
      setQuizAnswer(quizList);
      setParticipantInfo(null);
      setTeamInfo(null);
      navigate("/participant-info");
    } else {
      alert("퀴즈를 오류로 인해서 불러오지 못했습니다. 다시 시도해주세요.");
    }
  }, [
    navigate,
    quizState.data,
    quizState.status,
    setParticipantInfo,
    setProgress,
    setQuizAnswer,
    setTeamInfo,
  ]);

  const teamStartClick = useCallback(() => {
    if (
      teamResultState.status === "success" &&
      teamResultState.data &&
      quizState.status === "success" &&
      quizState.data
    ) {
      const teamResult = teamResultState.data;
      const quizList = quizState.data;
      setProgress(0);
      setQuizAnswer(quizList);
      setParticipantInfo(null);
      setTeamInfo({
        teamName: teamResult.teamName,
        teamCode: teamResult.teamCode,
      });
      navigate(`/participant-info/?${paramString}`);
    } else if (teamResultState.status === "error") {
      alert("팀 코드에 맞는 팀정보가 없습니다");
    } else if (teamResultState.status === "loading") {
      alert("팀 정보를 불러오지 못했습니다. 다시 눌러주세요");
    } else {
      alert("퀴즈 정보를 불러오지 못했습니다. 다시 눌러주세요.");
    }
  }, [
    navigate,
    paramString,
    quizState.data,
    quizState.status,
    setParticipantInfo,
    setProgress,
    setQuizAnswer,
    setTeamInfo,
    teamResultState.data,
    teamResultState.status,
  ]);

  const teamCreateClick = useCallback(() => {
    if (quizState.status === "success" && quizState.data) {
      const quizList = quizState.data;
      setProgress(0);
      setQuizAnswer(quizList);
      setParticipantInfo(null);
      setTeamInfo(null);
      navigate("/team-info");
    } else {
      alert("퀴즈를 오류로 인해서 불러오지 못했습니다. 다시 시도해주세요.");
    }
  }, [
    navigate,
    quizState.data,
    quizState.status,
    setParticipantInfo,
    setProgress,
    setQuizAnswer,
    setTeamInfo,
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="flex">
        <div className="flex justify-center items-center mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
            <div className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl flex flex-col gap-4">
              <p>점심 뭐먹지?</p>
              <p className="text-indigo-600">우리같이 고민해봐요!</p>
            </div>
            <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              Team WednesDay Bagel은 직장인들의 메뉴 선택 기준과 음식 취향을
              미리 알 수 있게 해서 고민 쉽게 해결, 음식 메뉴를 빠르게 결정하여
              기존에 발생하던 스트레스를 줄여 최다 인원의 만족을 이끌어냅니다
            </p>
            <div className="mt-10 flex flex-col justify-center">
              <div className="rounded-md shadow">
                <button
                  onClick={() => {
                    individualStartClick();
                  }}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  개인으로 시작하기
                </button>
              </div>
              {teamCode ? (
                // 참여 코드 잘못된 경우 예외 처리 필요
                <div className="mt-3 rounded-md shadow">
                  <button
                    onClick={() => {
                      teamStartClick();
                    }}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    팀으로 시작하기
                  </button>
                </div>
              ) : (
                <div className="mt-3 rounded-md shadow">
                  <button
                    onClick={() => {
                      teamCreateClick();
                    }}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    팀 생성 후 시작하기
                  </button>
                </div>
              )}
              <div className="mt-3 rounded-md shadow">
                <button
                  disabled={!participantInfo}
                  onClick={() => {
                    navigate("/questions");
                  }}
                  className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white ${
                    !participantInfo ? "opacity-50" : "hover:bg-gray-50 "
                  } md:py-4 md:text-lg md:px-10`}
                >
                  이어하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
