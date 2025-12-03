import { useEffect, RefObject } from "react";

/**
 * 특정 요소 외부 클릭을 감지하는 훅
 * 드롭다운, 모달 등에서 외부 클릭 시 닫기 기능 구현에 사용
 *
 * @param ref - 감지할 요소에 대한 ref
 * @param handler - 외부 클릭 시 실행할 함수
 * @param isActive - 이벤트 리스너 활성화 여부 (기본값: true)
 *
 * @example
 * ```tsx
 * const dropdownRef = useRef<HTMLDivElement>(null);
 * const [isOpen, setIsOpen] = useState(false);
 *
 * useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);
 *
 * return (
 *   <div ref={dropdownRef}>
 *     // 드롭다운 내용
 *   </div>
 * );
 * ```
 */
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null> | RefObject<T> | null,
  handler: (event: MouseEvent | TouchEvent) => void,
  isActive: boolean = true
): void => {
  useEffect(() => {
    // 이벤트 리스너가 비활성화되어 있으면 아무것도 하지 않음
    if (!isActive) {
      return;
    }

    const listener = (event: MouseEvent | TouchEvent) => {
      const element = ref?.current ?? null;

      // ref가 없거나 클릭된 요소가 ref 내부이면 아무것도 하지 않음
      if (!element || element.contains(event.target as Node)) {
        return;
      }

      // 외부를 클릭한 경우 handler 실행
      handler(event);
    };

    // 이벤트 리스너 등록
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Cleanup: 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, isActive]);
};
