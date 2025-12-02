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
 *
 * @example
 * ```tsx
 * const scrollRef = useRef<HTMLDivElement>(null);
 * const { hasVerticalScroll, hasScroll } = useHasScroll(scrollRef);
 *
 * return (
 *   <div>
 *     {hasScroll && <div>스크롤이 있습니다!</div>}
 *     <div ref={scrollRef} className="overflow-auto">
 *       {content}
 *     </div>
 *   </div>
 * );
 * ```
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

/**
 * 스크롤 위치를 감지하는 Hook
 *
 * @param ref - 감지할 요소의 React ref
 * @returns 스크롤 위치 정보
 *
 * @example
 * ```tsx
 * const scrollRef = useRef<HTMLDivElement>(null);
 * const { isAtTop, isAtBottom, scrollPercentage } = useScrollPosition(scrollRef);
 *
 * return (
 *   <div>
 *     {!isAtTop && <div>위로 스크롤할 수 있습니다</div>}
 *     {!isAtBottom && <div>아래로 스크롤할 수 있습니다</div>}
 *     <div ref={scrollRef} className="overflow-auto">
 *       {content}
 *     </div>
 *   </div>
 * );
 * ```
 */
export const useScrollPosition = <T extends HTMLElement>(
  ref: RefObject<T | null>
) => {
  const [scrollPosition, setScrollPosition] = useState({
    scrollTop: 0,
    scrollLeft: 0,
    scrollPercentage: 0,
    isAtTop: true,
    isAtBottom: false,
    isAtLeft: true,
    isAtRight: false,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const {
        scrollTop,
        scrollLeft,
        scrollHeight,
        clientHeight,
        scrollWidth,
        clientWidth,
      } = element;

      const maxScrollTop = scrollHeight - clientHeight;
      const maxScrollLeft = scrollWidth - clientWidth;
      const scrollPercentage =
        maxScrollTop > 0 ? (scrollTop / maxScrollTop) * 100 : 0;

      setScrollPosition({
        scrollTop,
        scrollLeft,
        scrollPercentage,
        isAtTop: scrollTop === 0,
        isAtBottom: Math.abs(scrollTop - maxScrollTop) < 1, // 부동소수점 오차 허용
        isAtLeft: scrollLeft === 0,
        isAtRight: Math.abs(scrollLeft - maxScrollLeft) < 1,
      });
    };

    // 초기 체크
    handleScroll();

    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  return scrollPosition;
};
