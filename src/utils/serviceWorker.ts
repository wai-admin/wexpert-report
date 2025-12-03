/**
 * Service Worker 등록 유틸리티
 */

/**
 * Service Worker를 등록하고 상태를 관리
 */
export const registerServiceWorker = async (): Promise<void> => {
  // Service Worker를 지원하지 않는 브라우저 체크
  if (!("serviceWorker" in navigator)) {
    console.warn("Service Worker is not supported in this browser");
    return;
  }

  try {
    // Service Worker 등록
    const registration = await navigator.serviceWorker.register(
      "/service-worker.js",
      {
        scope: "/",
      }
    );

    console.log("[SW] Service Worker registered successfully:", registration);

    // 업데이트 확인
    registration.addEventListener("updatefound", () => {
      const newWorker = registration.installing;
      console.log("[SW] New Service Worker found, installing...");

      newWorker?.addEventListener("statechange", () => {
        if (newWorker.state === "installed") {
          if (navigator.serviceWorker.controller) {
            // 새 버전이 설치되었지만 기존 워커가 아직 활성화되어 있음
            console.log("[SW] New content is available, please refresh");
            // 필요시 사용자에게 새로고침 알림
          } else {
            // 첫 설치
            console.log("[SW] Content is cached for offline use");
          }
        }
      });
    });

    // 주기적으로 업데이트 확인 (1시간마다)
    setInterval(() => {
      registration.update();
    }, 1000 * 60 * 60); // 1시간
  } catch (error) {
    console.error("[SW] Service Worker registration failed:", error);
  }
};

/**
 * Service Worker 등록 해제
 */
export const unregisterServiceWorker = async (): Promise<void> => {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();

    for (const registration of registrations) {
      await registration.unregister();
      console.log("[SW] Service Worker unregistered");
    }
  } catch (error) {
    console.error("[SW] Service Worker unregister failed:", error);
  }
};

/**
 * 캐시 초기화
 */
export const clearServiceWorkerCache = async (): Promise<void> => {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    // Service Worker에 캐시 삭제 메시지 전송
    registration.active?.postMessage({
      type: "CLEAR_CACHE",
    });

    console.log("[SW] Cache clear message sent");
  } catch (error) {
    console.error("[SW] Failed to clear cache:", error);
  }
};

/**
 * Service Worker 상태 확인
 */
export const getServiceWorkerStatus = (): string | null => {
  if (!("serviceWorker" in navigator)) {
    return null;
  }

  if (navigator.serviceWorker.controller) {
    return "active";
  }

  return "inactive";
};
