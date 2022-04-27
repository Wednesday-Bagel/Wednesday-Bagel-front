import { Result } from "./state/team/interface";
import { atom, AtomEffect } from "recoil";
import { recoilPersist } from "recoil-persist";

type RecoilPersist<T> = {
  persistAtom: AtomEffect<T>;
};

//버릴예정
const testResultList = [
  {
    resultImage:
      "https://cdn.pixabay.com/photo/2022/01/30/15/01/girl-6981336_960_720.jpg",
    resultType: "MZ세대의 전형 신입사원!",
    resultTypeComment: "당신 혹시,, 우리가 찾던 그 신입사원?",
    resultTypeAnalysis: [
      "회사 근처 처음 보는 맛집은 가장 먼저 가 봐야 직성이 풀리는 당신!",
      "사람들과 대화하는 것도 좋아하고, 리액션 맛집으로 소문난 덕분에 점심 약속이 끊이지 않겠는걸요?",
      "맛집 레이더로 인정받을 때면 왜인지 입꼬리가 올라가고...",
      "어디서나 사랑 받고 쉽게 사랑을 주어 자칫 가벼워보일 수 있지만 메뉴를 고를땐 누구보다 신중하고 논리적이군요...",
      '감정과 이성의 완벽한 조화를 이룬 당신은, 언제 어디서나 부둥부둥 아껴주고 싶은 "신입사원" !!',
    ],
    resultTypeTip: [
      "친해지고 싶은 동료/선배/후배가 있나요? 자신있게 다가가보세요! 당신의 쾌활한 에너지를 계속 기다려 왔을지도 몰라요",
      "가끔 점심 약속을 거절 당할까 두려운가요? 뭐 어때요! 내가 너무 귀여운 탓인가... 하면서 넘겨버립시다!",
    ],
    resultTypeBestMatch:
      "먹고 싶은게 있어도 메뉴 선택은 팀원에게 맞춰주는 배려심 많은 팀장님",
    resultTypeWorstMatch:
      "소수의 친한 사람들과의 식사를 선호하는 낭만파 부장님",
  },
  {
    resultImage:
      "https://cdn.pixabay.com/photo/2022/01/30/15/01/girl-6981336_960_720.jpg",
    resultType: "MZ세대의 전형 신입사원!",
    resultTypeComment: "당신 혹시,, 우리가 찾던 그 신입사원?",
    resultTypeAnalysis: [
      "회사 근처 처음 보는 맛집은 가장 먼저 가 봐야 직성이 풀리는 당신!",
      "사람들과 대화하는 것도 좋아하고, 리액션 맛집으로 소문난 덕분에 점심 약속이 끊이지 않겠는걸요?",
      "맛집 레이더로 인정받을 때면 왜인지 입꼬리가 올라가고...",
      "어디서나 사랑 받고 쉽게 사랑을 주어 자칫 가벼워보일 수 있지만 메뉴를 고를땐 누구보다 신중하고 논리적이군요...",
      '감정과 이성의 완벽한 조화를 이룬 당신은, 언제 어디서나 부둥부둥 아껴주고 싶은 "신입사원" !!',
    ],
    resultTypeTip: [
      "친해지고 싶은 동료/선배/후배가 있나요? 자신있게 다가가보세요! 당신의 쾌활한 에너지를 계속 기다려 왔을지도 몰라요",
      "가끔 점심 약속을 거절 당할까 두려운가요? 뭐 어때요! 내가 너무 귀여운 탓인가... 하면서 넘겨버립시다!",
    ],
    resultTypeBestMatch:
      "먹고 싶은게 있어도 메뉴 선택은 팀원에게 맞춰주는 배려심 많은 팀장님",
    resultTypeWorstMatch:
      "소수의 친한 사람들과의 식사를 선호하는 낭만파 부장님",
  },
  {
    resultImage:
      "https://cdn.pixabay.com/photo/2022/01/30/15/01/girl-6981336_960_720.jpg",
    resultType: "MZ세대의 전형 신입사원!",
    resultTypeComment: "당신 혹시,, 우리가 찾던 그 신입사원?",
    resultTypeAnalysis: [
      "회사 근처 처음 보는 맛집은 가장 먼저 가 봐야 직성이 풀리는 당신!",
      "사람들과 대화하는 것도 좋아하고, 리액션 맛집으로 소문난 덕분에 점심 약속이 끊이지 않겠는걸요?",
      "맛집 레이더로 인정받을 때면 왜인지 입꼬리가 올라가고...",
      "어디서나 사랑 받고 쉽게 사랑을 주어 자칫 가벼워보일 수 있지만 메뉴를 고를땐 누구보다 신중하고 논리적이군요...",
      '감정과 이성의 완벽한 조화를 이룬 당신은, 언제 어디서나 부둥부둥 아껴주고 싶은 "신입사원" !!',
    ],
    resultTypeTip: [
      "친해지고 싶은 동료/선배/후배가 있나요? 자신있게 다가가보세요! 당신의 쾌활한 에너지를 계속 기다려 왔을지도 몰라요",
      "가끔 점심 약속을 거절 당할까 두려운가요? 뭐 어때요! 내가 너무 귀여운 탓인가... 하면서 넘겨버립시다!",
    ],
    resultTypeBestMatch:
      "먹고 싶은게 있어도 메뉴 선택은 팀원에게 맞춰주는 배려심 많은 팀장님",
    resultTypeWorstMatch:
      "소수의 친한 사람들과의 식사를 선호하는 낭만파 부장님",
  },
  {
    resultImage:
      "https://cdn.pixabay.com/photo/2022/01/30/15/01/girl-6981336_960_720.jpg",
    resultType: "MZ세대의 전형 신입사원!",
    resultTypeComment: "당신 혹시,, 우리가 찾던 그 신입사원?",
    resultTypeAnalysis: [
      "회사 근처 처음 보는 맛집은 가장 먼저 가 봐야 직성이 풀리는 당신!",
      "사람들과 대화하는 것도 좋아하고, 리액션 맛집으로 소문난 덕분에 점심 약속이 끊이지 않겠는걸요?",
      "맛집 레이더로 인정받을 때면 왜인지 입꼬리가 올라가고...",
      "어디서나 사랑 받고 쉽게 사랑을 주어 자칫 가벼워보일 수 있지만 메뉴를 고를땐 누구보다 신중하고 논리적이군요...",
      '감정과 이성의 완벽한 조화를 이룬 당신은, 언제 어디서나 부둥부둥 아껴주고 싶은 "신입사원" !!',
    ],
    resultTypeTip: [
      "친해지고 싶은 동료/선배/후배가 있나요? 자신있게 다가가보세요! 당신의 쾌활한 에너지를 계속 기다려 왔을지도 몰라요",
      "가끔 점심 약속을 거절 당할까 두려운가요? 뭐 어때요! 내가 너무 귀여운 탓인가... 하면서 넘겨버립시다!",
    ],
    resultTypeBestMatch:
      "먹고 싶은게 있어도 메뉴 선택은 팀원에게 맞춰주는 배려심 많은 팀장님",
    resultTypeWorstMatch:
      "소수의 친한 사람들과의 식사를 선호하는 낭만파 부장님",
  },
];

const { persistAtom: persistProgressAtom } = recoilPersist({
  key: "recoil-persist-progress",
}) as RecoilPersist<number>;

//안쓸예정
const { persistAtom: persistQuizAnswerListAtom } = recoilPersist({
  key: "recoil-persist-quizAnswerList",
}) as RecoilPersist<Quiz[] | null>;

const { persistAtom: persistParticipantInfo } = recoilPersist({
  key: "recoil-persist-participantInfo",
}) as RecoilPersist<any>;

const { persistAtom: persistTeamInfo } = recoilPersist({
  key: "recoil-persist-teamInfo",
}) as RecoilPersist<any>;

export const progressAtom = atom<number>({
  key: "progressAtom",
  default: 0,
  effects_UNSTABLE: [persistProgressAtom],
});

//안쓸예정
export type Quiz = {
  question: string;
  answerChoiceList: string[];
  choiceNumber?: number;
};

//안쓸예정
export const quizListAtom = atom<Quiz[] | null>({
  key: "quizlist",
  default: null,
});

//안쓸예정
export const quizAnswerListAtom = atom<Quiz[] | null>({
  key: "quizAnswerList",
  default: null,
  effects_UNSTABLE: [persistQuizAnswerListAtom],
});

export const participantInfoAtom = atom<any>({
  key: "participant-info-atom",
  default: null,
  effects_UNSTABLE: [persistParticipantInfo],
});

//안쓸예정
export const teamInfoAtom = atom<any>({
  key: "team-info-atom",
  default: { teamName: null, teamCode: null },
  effects_UNSTABLE: [persistTeamInfo],
});

//안쓸예정
export const testResultListAtom = atom<any>({
  key: "testResultList",
  default: testResultList,
});

export const individualResultAtom = atom<Result | null>({
  key: "individualResultAtom",
  default: null,
});
