import { TextField } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { teamInfoAtom } from "../recoil/quiz";
import { api_ } from "../plugins/axios";

const TeamInfoPage: FC = function TeamInfoPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const setTeamInfo = useSetRecoilState(teamInfoAtom);

  const onSubmit = async (data: any) => {
    try {
      const { data: data_ } = await api_.post("/home", {
        teamName: data.teamInfo.teamName,
      });
      console.log({
        teamName: data.teamInfo.teamName,
        teamCode: data_.teamCode,
      });

      setTeamInfo({
        teamName: data.teamInfo.teamName,
        teamCode: data_.teamCode,
      });
      navigate(`/participant-info/?teamCode=${data_.teamCode}`);
    } catch (err: any) {
      alert(`팀 생성에 실패하였습니다\n${err?.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="flex">
        <div className="h-screen flex justify-center items-center mx-auto max-w-5xl w-full pt-16 pb-20 text-center lg:py-48">
          <div className="bg-white border border-gray-200 p-4 lg:w-1/2 sm:px-8 xl:pr-16">
            <div className="px-4 py-8 text-lg font-medium space-y-4">
              <span className="block">
                안녕하세요! 설정하실 팀 이름을 입력해주세요.
              </span>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label={errors?.teamInfo?.teamName.message ?? "팀 이름"}
                type="text"
                {...register("teamInfo.teamName", {
                  required: {
                    value: true,
                    message: "팀 이름을 입력해주세요",
                  },
                })}
                error={errors?.teamInfo?.teamName}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleSubmit(onSubmit)}
                className="bg-blue-700 h-10 px-8 text-white rounded-md hover:bg-blue-500 transition-colors duration-150 ease-out disabled:opacity-50"
              >
                팀 이름으로 생성하기
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamInfoPage;
