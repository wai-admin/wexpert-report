/**
 * Service Worker for Font Caching
 * 폰트 파일을 캐싱하여 로딩 속도 향상
 */

const CACHE_NAME = "wexpert-fonts-v1";
const FONT_CACHE_NAME = "wexpert-fonts-cache-v1";

// 캐시할 폰트 파일 목록
const FONT_FILES = [
  "/src/assets/fonts/Pretendard-Regular.woff2",
  "/src/assets/fonts/Pretendard-Medium.woff2",
  "/src/assets/fonts/Pretendard-SemiBold.woff2",
];

// 이미지 파일도 함께 캐싱 (선택사항)
const STATIC_ASSETS = [
  "/images/background.webp",
  "/images/wexpert.png",
  "/images/arrow-dropdown-icon.png",
  "/images/arrow-normal-icon.png",
  "/images/arrow-sort-icon.png",
  "/images/close-icon.png",
  "/images/information-icon.png",
  "/images/no-preview-icon.png",
  "/images/search-icon.png",
];

/**
 * Service Worker 설치 이벤트
 * 폰트와 정적 자산을 미리 캐싱
 */
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      try {
        // 폰트 캐시 생성
        const fontCache = await caches.open(FONT_CACHE_NAME);
        await fontCache.addAll(FONT_FILES);

        // 정적 자산 캐시 생성
        const staticCache = await caches.open(CACHE_NAME);
        await staticCache.addAll(STATIC_ASSETS);

        // 즉시 활성화
        self.skipWaiting();
      } catch (error) {
        console.error("[Service Worker] Cache failed:", error);
      }
    })()
  );
});

/**
 * Service Worker 활성화 이벤트
 * 오래된 캐시 정리
 */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // 모든 캐시 키 가져오기
      const cacheNames = await caches.keys();

      // 현재 버전이 아닌 캐시 삭제
      await Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName !== CACHE_NAME &&
            cacheName !== FONT_CACHE_NAME &&
            cacheName.startsWith("wexpert-")
          ) {
            return caches.delete(cacheName);
          }
        })
      );

      // 모든 클라이언트에서 즉시 제어권 가져오기
      await self.clients.claim();
    })()
  );
});

/**
 * Fetch 이벤트 핸들러
 * Cache-First 전략: 캐시 우선, 없으면 네트워크
 */
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 폰트 파일 요청인지 확인
  const isFontRequest =
    url.pathname.endsWith(".woff2") ||
    url.pathname.endsWith(".woff") ||
    url.pathname.endsWith(".ttf") ||
    url.pathname.includes("/fonts/");

  // 정적 이미지 요청인지 확인
  const isImageRequest =
    url.pathname.startsWith("/images/") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".webp");

  // 폰트나 이미지 요청만 캐싱 처리
  if (isFontRequest || isImageRequest) {
    event.respondWith(
      (async () => {
        try {
          // 1. 캐시에서 먼저 찾기
          const cacheName = isFontRequest ? FONT_CACHE_NAME : CACHE_NAME;
          const cache = await caches.open(cacheName);
          const cachedResponse = await cache.match(request);

          if (cachedResponse) {
            return cachedResponse;
          }

          // 2. 캐시에 없으면 네트워크에서 가져오기
          const networkResponse = await fetch(request);

          // 3. 성공적인 응답이면 캐시에 저장
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            await cache.put(request, responseToCache);
          }

          return networkResponse;
        } catch (error) {
          console.error("[Service Worker] Fetch failed:", error);
          // 폴백 응답 또는 에러 처리
          return new Response("Network error happened", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
          });
        }
      })()
    );
  }
  // 다른 요청은 그냥 통과
});

/**
 * 메시지 이벤트 핸들러
 * 앱에서 캐시 제어 가능
 */
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "CLEAR_CACHE") {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName.startsWith("wexpert-")) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  }
});
