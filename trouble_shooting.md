# 트러블 슈팅

## 폴링 로직 만들기

### 문제 상황 1

1. inProgressQueue에서 data fetching 성공 후, removeFromQueue를 호출
2. inProgressQueue가 바뀔 때마다 useEffect가 호출되어, 현재 실행 중인 request가 요청됨.

### 문제 해결 1

1. activeRequestNum(현재 실행 중인 request 수)를 useState로 관리
2. inProgressQueue에서 data fetching 전, removeFromQueue를 호출
3. data fetching 전, activeRequestNum을 1 증가
4. data fetching 성공 or 실패 후, activeRequestNum을 1 감소
