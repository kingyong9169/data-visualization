# 트러블 슈팅

## 1. 폴링 로직 만들기

### 문제 상황

1. inProgressQueue에서 data fetching 성공 후, removeFromQueue를 호출.
2. inProgressQueue가 바뀔 때마다 useEffect가 호출되어, 현재 실행 중인 request가 요청됨.

### 문제 해결

1. activeRequestNum(현재 실행 중인 request 수)를 useState로 관리.
2. inProgressQueue에서 data fetching 전, removeFromQueue를 호출.
3. data fetching 전, activeRequestNum을 1 증가.
4. data fetching 성공 or 실패 후, activeRequestNum을 1 감소.

## 2. 차트 축에 데이터 정렬과 중복값 제거없이 순서대로 표시하기

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

## 3. 여러 api를 호출하는 useAsyncs 훅 로직

### 문제 상황

1. 각 api의 로딩 상태를 체크해야 전체 api 관점의 로딩 상태를 알 수 있음.
2. 에러를 초기화할 때, 에러가 발생한 api만 재요청하기 위해서는 어떤 api에서 에러가 발생했는지 알아야 함.

### 문제 해결

1. 각 api의 로딩 상태를 체크하기 위해, 각 api의 로딩 상태를 배열로 관리하고 모든 api의 로딩 상태가 false일 때만 로딩 상태를 false로 설정.
2. 각 api의 에러 상태를 배열로 관리하고 에러가 발생한 api만 index로 구분하여 재요청.

## 4. 특정 에이전트 스레드 api 요청에 데이터가 필요한데 에이전트 리스트를 요청하는 api가 없다면?

### 문제 상황

1. 대시보드 사용성 개선을 위해 에이전트 스레드 api에서 특정 에이전트 스레드의 데이터를 요청해야 하는 상황.
2. 하지만 에이전트 리스트 데이터를 요청하는 api가 없음.
3. 에이전트 스레드 api에서 에이전트 리스트에 관한 데이터가 존재함.

### 문제 해결

1. 에이전트 리스트 상태를 컴포넌트들이 공유할 수 있도록 Context API로 관리
2. 에이전트 스레드 api에서 에이전트 리스트에 관한 데이터를 가공하여 상태 업데이트.
3. 모든 에이전트 데이터를 필요하기에 첫 마운트 시 모든 에이전트를 대상으로 하는 api 요청.
4. 에이전트 스레드 api는 5초 주기로 호출되므로, 에이전트 리스트는 최초 한 번만 상태 업데이트하도록 제어.
5. 선택된 에이전트를 상태로 관리하며, 하나도 선택되지 않은 에이전트는 전부 선택된 것으로 간주.
6. 에이전트 리스트를 필요로 하는 컴포넌트에서는 상태를 데이터로 가공하여 api 요청

## 5. 시간 범위를 선택할 때, 렌더링마다 Date객체가 재생성되는 문제

### 문제 상황

1. 시간 범위를 선택할 때, Date 객체를 사용하여 시간 범위를 계산.
2. 프로젝트의 특성상 실시간으로 데이터가 업데이트되므로, 렌더링마다 Date 객체가 재생성되는 것은 성능에 좋지 않음.

### 문제 해결

1. 시간과 관련된 상태(날짜, 시간)가 변경되었을 때만 Date 객체를 생성하도록 시간 상태를 useState로 관리.
2. useEffect를 사용하여 상태 업데이트

## 6. usePollingController에서 forEach를 사용하는데 side effect가 발생할 수 있음

### 문제 상황

1. queue에서 요청할 부분을 slice로 자름.
2. slice된 queue를 forEach로 순회하며 요청.
3. forEach에서 해당 queue상태를 변경하여 side effect가 발생할 수 있음.

### 문제 해결

1. slice된 queue를 map으로 순회하며 상태를 변경하고 파라미터에 넣은 값을 깊은 복사하여 요청할 api 정보 배열로 리턴.
2. 리턴된 배열을 forEach로 순회하며 요청하여 side effect 방지.
