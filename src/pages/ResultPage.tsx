import { useCallback } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { individualResultAtom } from "../recoil/quiz";
import { teamResultSelctorFamily } from "../recoil/state";

export function ResultPage() {
  const [searchParms] = useSearchParams();
  const teamCode = searchParms.get("teamCode");
  const paramString = searchParms.toString();
  const teamResultListState = useRecoilValue(
    teamResultSelctorFamily(teamCode ?? "undefined")
  );

  const individualResult = useRecoilValue(individualResultAtom);

  const navigate = useNavigate();

  const teamResultShowClick = useCallback(() => {
    if (teamResultListState.status === "success" && teamResultListState.data) {
      navigate(`/team-board/?${paramString}`);
    } else if (teamResultListState.status === "error") {
      alert("팀 코드가 존재하지 않습니다");
    } else {
      alert("팀 정보를 불러오는 중입니다. 다시 시도해주세요");
    }
  }, [
    navigate,
    paramString,
    teamResultListState.data,
    teamResultListState.status,
  ]);

  if (individualResult) {
    return (
      <div className="flex min-h-full">
        <div className="justify-center items-center text-center max-w-xl mx-auto p-6 sm:bg-gray-100 min-h-screen">
          <img
            className="w-full h-1/3 object-cover mb-8"
            src={individualResult.questionResultImageName}
            alt="result"
          />
          <p className="text-lg mb-8">
            {individualResult.name}님, 당신은{" "}
            <span className="font-bold">{individualResult.title}</span>
          </p>
          <p className="text-lg font-bold mb-8">
            🍔"{individualResult.subtitle}"🍔
          </p>
          <div className="flex flex-col justify-center items-center">
            <div className="text-center">{individualResult.detail}</div>
            <p className="font-bold mt-4">💡 점심시간 TIP 💡</p>
            <div className="text-center">{"- " + individualResult.tip}</div>
            <p className="font-bold mt-4">✅ 찰떡 궁합</p>
            <p>{individualResult.perfectMatch}</p>
            <p className="font-bold mt-4">❌ 상극 궁합</p>
            <p>{individualResult.badMatch}</p>
            <div className="flex flex-col w-full mt-10 mb-10">
              <button
                onClick={() => {
                  teamResultShowClick();
                }}
                disabled={!teamCode}
                className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 md:py-4 md:text-lg md:px-10 ${
                  !teamCode ? "opacity-50" : "hover:bg-indigo-700"
                }`}
              >
                팀 결과 보기
              </button>
              <button
                onClick={() => {
                  navigate("/home");
                }}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 mt-4"
              >
                홈으로 가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/home"></Navigate>;
  }
}
