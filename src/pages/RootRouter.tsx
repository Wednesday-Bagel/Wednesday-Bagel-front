import React, { FC } from "react";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import { useQuizHook } from "../recoil/hook";
import { useTeamResultHook } from "../recoil/hook/team/hook";
import HomePage from "./HomePage";
import ParticipantInfoPage from "./ParticipantInfoPage";
import QuizPage from "./QuizPage";
import { ResultPage } from "./ResultPage";
import { TeamBoardPage } from "./TeamBoardPage";
import TeamInfoPage from "./TeamInfoPage";

export const RootRouter: FC = function RootRouter() {
  const [searchParams] = useSearchParams();
  const teamCode = searchParams.get("teamCode");

  useQuizHook();
  useTeamResultHook(teamCode);
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="home" element={<HomePage />} />
        <Route path="team-info" element={<TeamInfoPage />} />
        <Route path="participant-info" element={<ParticipantInfoPage />} />
        <Route path="questions" element={<QuizPage />} />
        <Route path="result" element={<ResultPage />} />
        <Route path="team-board" element={<TeamBoardPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </React.Fragment>
  );
};
