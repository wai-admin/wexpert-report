# 📝 버전 변경 이력

#### 📂 관련 파일

```
src/constants/bridge.ts          # Bridge 타입 정의
src/provider/BridgeProvider.tsx  # Bridge 통신 구현
src/utils/bridge.ts              # Bridge 메시지 전송 함수
```

## 🗓️ 2025-12-11

### 📦 Version: `1.8.1.25344`

#### ✨ 추가된 Bridge 타입

<table>
<thead>
<tr>
<th>타입</th>
<th>내용</th>
<th>시나리오</th>
</tr>
</thead>
<tbody>

<tr>
<td><code>close</code></td>
<td>
ESC 키를 감지하여 Bridge를 통해 Native로 닫힘 상태 정보 전달
</td>
<td>
사용자가 ESC 키를 누르면 Report 창이 닫힘
</td>
</tr>

<tr>
<td><code>session_termination</code></td>
<td>
API 호출의 401, 405, 406 오류 발생 시 세션 만료 정보 전달
<br/>
<strong>에러 코드:</strong>
<ul>
<li>401: 유효하지 않은 토큰</li>
<li>405: 중복 로그인</li>
<li>406: 라이선스 정보 업데이트</li>
</ul>
</td>
<td>
API 호출 시 위 오류 발생 시 Report 창이 닫히고 재로그인 유도
</td>
</tr>

</tbody>
</table>

#### ✨ 수정된 Bridge 타입

- 없음
