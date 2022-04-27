import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { individualResultAtom } from "../recoil/quiz";
import { Result, teamResultSelctorFamily } from "../recoil/state";

export function TeamBoardPage() {
  const [searchParams] = useSearchParams();
  const teamCode = searchParams.get("teamCode");
  const paramString = searchParams.toString();

  const teamResultState = useRecoilValue(
    teamResultSelctorFamily(teamCode ?? "undefined")
  );
  const setIndividualResult = useSetRecoilState(individualResultAtom);
  const navigate = useNavigate();

  const copyTeamUrl = (url: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("클립보드에 복사되었습니다.");
        })
        .catch(() => {
          alert("복사를 다시 시도해주세요.");
        });
    } else {
      if (!document.queryCommandSupported("copy")) {
        return alert("복사하기가 지원되지 않는 브라우저입니다.");
      }
    }
  };

  if (teamResultState.status === "success" && teamResultState.data) {
    const teamResult = teamResultState.data;

    const teamInfo = {
      teamName: teamResult.teamName,
      teamCode: teamResult.teamCode,
    };
    return (
      <div className="flex min-h-screen w-screen bg-gray-100">
        <div className="justify-center items-center mx-auto p-6 max-w-7xl w-full bg-white space-y-4">
          <div className="text-2xl font-medium">
            팀 {teamInfo.teamName}의 결과 모아보기
          </div>
          <div className="flex flex-col items-center">
            {/* grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {teamResult.resultDtos.map((result: Result, index: number) => {
                return (
                  <div
                    className="w-full border-2 border-gray shadow-md cursor-pointer"
                    key={index}
                    onClick={() => {
                      setIndividualResult(result);
                      navigate("/result");
                    }}
                  >
                    <div className="flex items-center justify-center w-full h-48 border-b-2 border-gray overflow-hidden">
                      <img src={result.questionResultImageName} alt="result" />
                    </div>
                    <div className=" h-32 p-4">
                      <p className="font-bold text-base mb-1">
                        {result.name}님의 결과
                      </p>
                      <p>{result.title}</p>
                      <p className="mb-2">{result.subtitle}</p>
                      <p className="text-xs">
                        자세한 내용은 상세페이지를 확인하세요!
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-1/2 mt-10 mb-10">
              <button
                onClick={() => {
                  copyTeamUrl(
                    `http://localhost:3000/home/?teamCode=${teamInfo.teamCode}`
                  );
                }}
                disabled={!teamInfo.teamCode}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 md:py-4 md:text-lg md:px-10 hover:bg-indigo-700"
              >
                팀 링크 복사
              </button>
              <button
                onClick={() => {
                  navigate(`/home/?${paramString}`);
                }}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 mt-4"
              >
                홈으로 가기
              </button>
            </div>
          </div>
          <footer className="text-gray-400 flex flex-col justify-center items-center">
            <button
              onClick={() =>
                window.open(
                  "https://www.freepik.com/vectors/portrait-illustration"
                )
              }
            >
              "https://www.freepik.com/vectors/portrait-illustration"
            </button>
            Portrait illustration vector created by pikisuperstar -
            www.freepik.com
          </footer>
        </div>
      </div>
    );
  } else {
    return <div>로딩중...</div>;
  }
}
