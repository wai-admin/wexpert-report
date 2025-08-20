import { create } from "zustand";
import { NativeDefaultMessage } from "@/lib/nativeMessageType";
import { ELEMENT } from "@/constants/element";

interface MessageState {
  nativeMessage: NativeDefaultMessage | null;
  setNativeMessage: (message: NativeDefaultMessage) => void;
  clearMessage: () => void;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  nativeMessage: null,
  setNativeMessage: (message: NativeDefaultMessage) => {
    // 변경될 요소가 있는 경우 스크롤 처리
    handleScrollToElement({
      currentMessage: get().nativeMessage,
      newMessage: message,
    });

    set({ nativeMessage: message });
  },
  clearMessage: () => set({ nativeMessage: null }),
}));

// messageStore 전용 핸들러
/**
 * 변경되는 message에 따라 해당 요소로 스크롤
 * 변경되는 요소가 2개 이상이면 가장 마지막 요소로 스크롤
 */
const handleScrollToElement = ({
  currentMessage,
  newMessage,
}: {
  currentMessage: NativeDefaultMessage | null;
  newMessage: NativeDefaultMessage;
}) => {
  // 변경된 메시지에 해당하는 요소들 수집 저장소
  const changedElements: string[] = [];

  // 차트 번호 or 생년월일
  const isPatientInfoChanged =
    newMessage.chartNo !== currentMessage?.chartNo ||
    newMessage.birthDay !== currentMessage?.birthDay ||
    newMessage.birthMonth !== currentMessage?.birthMonth ||
    newMessage.birthYear !== currentMessage?.birthYear;

  // 담당 의사 소견
  const isAssessmentChanged =
    newMessage.assessment !== currentMessage?.assessment;

  if (isPatientInfoChanged) {
    changedElements.push(ELEMENT.PATIENT_INFORMATION);
  }

  if (isAssessmentChanged) {
    changedElements.push(ELEMENT.ASSESSMENT);
  }

  // 변경된 요소 중 가장 마지막 요소로 스크롤
  const targetElement = document.getElementById(
    `${ELEMENT.A4_CONTAINER}-${changedElements[changedElements.length - 1]}`
  );

  // 스크롤 실행 (값 적용 후 스크롤을 위해 setTimeout)
  if (targetElement) {
    setTimeout(() => {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
};
