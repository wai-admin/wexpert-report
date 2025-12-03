import { useEffect, useState, RefObject } from "react";

interface UseHasScrollOptions {
  /** 수평 스크롤 감지 여부 (기본값: false) */
  horizontal?: boolean;
  /** 수직 스크롤 감지 여부 (기본값: true) */
  vertical?: boolean;
}

interface HasScrollResult {
  /** 수직 스크롤이 존재하는지 여부 */
  hasVerticalScroll: boolean;
  /** 수평 스크롤이 존재하는지 여부 */
  hasHorizontalScroll: boolean;
  /** 어떤 방향이든 스크롤이 존재하는지 여부 */
  hasScroll: boolean;
}

/**
 * 요소에 스크롤이 생기는지 감지하는 Hook
 *
 * @param ref - 감지할 요소의 React ref
 * @param options - 감지 옵션
 * @returns 스크롤 존재 여부
 */
export const useHasScroll = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseHasScrollOptions = {}
): HasScrollResult => {
  const { horizontal = false, vertical = true } = options;

  const [hasVerticalScroll, setHasVerticalScroll] = useState(false);
  const [hasHorizontalScroll, setHasHorizontalScroll] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const checkScroll = () => {
      if (vertical) {
        const hasVScroll = element.scrollHeight > element.clientHeight;
        setHasVerticalScroll(hasVScroll);
      }

      if (horizontal) {
        const hasHScroll = element.scrollWidth > element.clientWidth;
        setHasHorizontalScroll(hasHScroll);
      }
    };

    // 초기 체크
    checkScroll();

    // ResizeObserver: 요소 크기 변경 감지
    const resizeObserver = new ResizeObserver(() => {
      checkScroll();
    });

    // MutationObserver: 자식 요소 변경 감지
    const mutationObserver = new MutationObserver(() => {
      checkScroll();
    });

    resizeObserver.observe(element);
    mutationObserver.observe(element, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    // 윈도우 리사이즈 이벤트
    window.addEventListener("resize", checkScroll);

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", checkScroll);
    };
  }, [ref, horizontal, vertical]);

  return {
    hasVerticalScroll,
    hasHorizontalScroll,
    hasScroll: hasVerticalScroll || hasHorizontalScroll,
  };
};
