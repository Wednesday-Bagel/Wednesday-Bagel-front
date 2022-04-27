import { TextField } from "@mui/material";
import { FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { participantInfoAtom, teamInfoAtom } from "../recoil/quiz";

const ParticipantInfoPage: FC = function ParticipantInfoPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const setParticipantInfo = useSetRecoilState(participantInfoAtom);
  const teamInfo = useRecoilValue(teamInfoAtom);
  const [searchParams] = useSearchParams();
  const paramString = searchParams.toString();

  const onSubmit = async (data: any) => {
    setParticipantInfo(data.participantInfo);
    navigate(`/questions/?${paramString}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="flex">
        <div className="h-screen flex justify-center items-center mx-auto max-w-5xl w-full pt-16 pb-20 text-center lg:py-48">
          <div className="bg-white border border-gray-200 p-4 lg:w-1/2 sm:px-8 xl:pr-16">
            <div className="px-4 py-8 text-lg font-medium space-y-4">
              <span className="block">
                {teamInfo.team_name
                  ? "아래 입력란에 이름을 입력해주세요."
                  : "안녕하세요! 아래 입력란에 이름을 입력해주세요."}
              </span>
              <TextField
                id="outlined-basic"
                variant="outlined"
                autoFocus
                label={errors?.participantInfo?.name.message ?? "이름"}
                type="text"
                {...register("participantInfo.name", {
                  required: { value: true, message: "이름을 입력해주세요" },
                })}
                error={errors?.participantInfo?.name}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleSubmit(onSubmit)}
                className="bg-blue-700 h-10 px-8 text-white rounded-md hover:bg-blue-500 transition-colors duration-150 ease-out disabled:opacity-50"
              >
                다음
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParticipantInfoPage;
