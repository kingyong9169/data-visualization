# 트러블 슈팅

## 폴링 로직 만들기

### 문제 상황

1. inProgressQueue에서 data fetching 성공 후, removeFromQueue를 호출.
2. inProgressQueue가 바뀔 때마다 useEffect가 호출되어, 현재 실행 중인 request가 요청됨.

### 문제 해결

1. activeRequestNum(현재 실행 중인 request 수)를 useState로 관리.
2. inProgressQueue에서 data fetching 전, removeFromQueue를 호출.
3. data fetching 전, activeRequestNum을 1 증가.
4. data fetching 성공 or 실패 후, activeRequestNum을 1 감소.

## 차트 축에 데이터 정렬과 중복값 제거없이 순서대로 표시하기

### 문제 상황

> 막대 차트를 그릴 때, y 축에 [0, 3, 4, 3, 0]과 같은 데이터를 정렬하지 않고 그대로 표시하고자 함.

1. domain에 있는 값들이 순서대로 표시되도록 data를 그대로 넣음.
2. 하지만 중복된 값들이 사라져 [0, 3, 4]로 원하지 않는 결과가 나옴.
3. 공식문서, 블로그, chat gpt의 힘을 빌려도 해결하지 못함.

### 문제 해결

> 편법 사용

1. domain을 설정할 때가 문제가 되므로 domain에 중복된 값이 들어가지 않도록 함.
2. 각 데이터에 index만큼 '.'.repeat(index)하여 domain에 넣어서 중복 방지.
3. axis에서는 tickFormat을 설정하여, '.'을 제거하고 숫자로 표시되도록 함.
