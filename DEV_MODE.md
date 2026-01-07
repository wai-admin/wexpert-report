# 로컬 브라우저 환경에서 개발환경 설정 방법
네이티브 브릿지가 없는 로컬의 브라우저 환경에서도 초기화 메시지를 전송받아 테스트가 가능하도록 환경을 설정하는 방법
## .env.development 설정
1. Postman 으로 개발서버에 로그인 후 응답의 액세스 토큰을 복사해 VITE_WEXPERT_USER_ACCESS_TOKEN 변수의 값으로 설정
2. Postman 으로 전체 환자 목록 조회 후 테스트할 환자 아이디를 확인하여 VITE_WEXPERT_PATIENT_ID 변수의 값으로 설정
3. `npm run dev` 로 개발모드 구동