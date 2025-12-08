import { useEffect, useState, RefObject } from "react";

/**
 * 스크롤 위치를 감지하는 Hook
 * @param ref - 감지할 요소의 React ref
 * @returns 스크롤 위치 정보
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
