# 대시보드 제작 프로젝트(데이터 시각화)

> Open API를 활용한 대시보드 구현

## 차트 선택 기준

1. 용도와 목적을 고려
2. 데이터 시각화 관점에서 사용자가 필요로 하는 정보를 보여주는 것을 고려

## 데이터 종류에 따른 차트 선택

1. **인포매틱스 형태**: (종류, 개수)와 같이 단순 정보 전달
2. **막대그래프 형태**: 비슷한 종류의 데이터를 막대의 크기로 비교하여 정보 전달
3. **라인그래프 형태**: 여러 종류의 데이터를 시간에 따라 변화하는 추세를 그래프로 정보 전달

## 기술 선택

1. **React**: 사용자 인터페이스를 만들기 위한 자바스크립트 라이브러리
2. **Typescript**: 자바스크립트를 정적 타입 분석하여 런타임에서 발생할 수 있는 오류를 사전에 차단
3. **d3.js**: 데이터 시각화를 위한 자바스크립트 라이브러리, HTML Canvas로 구현하기에는 시간적 제약이 있고, low level에서 차트 커스텀을 하기 위해 선택
4. **sass**: css 전처리기로서, css의 재사용성을 높이고, 코드의 가독성을 높이고, 유지보수를 쉽게 하기 위해 사용
5. **vite**: 빠른 속도로 개발할 수 있는 번들링 도구

## 차트 컴포넌트 설계

1. 차트 종류에 따라 필요한 데이터를 고정시키고 props로 받아서 차트 렌더링
2. 차트에 필요한 속성들을 props로 전달
3. 차트는 데이터가 바뀌면 다시 그려야하기 때문에 useEffect를 사용하여 데이터가 바뀔 때마다 차트를 다시 그리도록 함
4. 차트를 그리는 부분은 hook으로 분리하여 컴포넌트의 view와 logic을 분리

## 차트를 사용하는 컴포넌트

1. data fetching하여 차트에 props로 전달 및 차트 외 UI 담당
2. 차트가 필요로 하는 데이터 형태로 데이터 가공
3. 비즈니스 로직은 커스텀 hook으로 분리하여 view와 logic 분리

## 기술적 난제

### 1. 5초 간격으로 실시간 데이터 요청

1. useEffect와 setTimeout을 이용하여 5초 간격으로 데이터 요청하고 데이터 상태를 관리하는 useAsync 커스텀 hook 구현
2. 네트워크 부하를 고려하여 동시에 요청할 수 있는 요청의 개수를 제한(MVC 패턴 형태로 상태 관리)

- Context API에서 큐 자료구조 2개를 사용하고 상태 업데이트 로직 작성(model)
- App의 요청 상태를 관리하는 controller(커스텀 hook) 구현
- 각 컴포넌트(view)에서는 useAsync 커스텀 hook을 사용하여 요청 상태를 관리

3. 데이터 요청에 실패할 경우, timer를 멈추고 화면에 에러 메시지와 retry 버튼 제공, retry 버튼 클릭 시 다시 데이터 요청 및 timer 시작

### 2. 시계열 데이터 네트워크 요청 부하 성능 최적화

> 첫 번째 요청에는 최근 1시간 동안의 data fetching, 이후 요청에는 마지막 요청 시간부터 현재 시간까지의 data fetching 및 상태 업데이트

- 상태 업데이트 로직을 useAsync hook의 options.select에 callback으로 전달
- select에서는 해당 컴포넌트의 데이터 가공 로직 작성

### 3. 리렌더링 최적화

> 과도한 props drilling 문제가 있었고 전역 상태 관리를 사용할 만큼의 프로젝트가 아니기 때문에 Context API를 사용하기로 결정

1. App 컴포넌트(최상위 컴포넌트)에서 Context API를 사용했기에 하위 컴포넌트에서 context를 사용하여 상태가 변경되면 App 하위의 모든 컴포넌트들이 리렌더링 되는 문제.
2. Context 내에서 작성했던 함수들을 순수 함수로 작성하고 useMemo로 감싸서 리렌더링이 되어도 함수가 재생성되지 않도록 함.
3. values, actions로 Context를 분리하여 필요한 컴포넌트에서 필요한 값만 사용하도록 함. 예를 들어, 함수만 필요한 컴포넌트에서는 불필요하게 values까지 전달하지 않도록 하여 리렌더링 방지.
4. 하위 컴포넌트에서는 memo를 사용하여 props가 변경되지 않으면(참조하고 있는 Context의 상태가 변경되지 않으면) 리렌더링 되지 않도록 함.

## To Do List

1. ~~네트워크 요청 부하 성능 최적화~~
2. ~~data fetching 실패 시 예외 처리~~
3. UX 개선

- 라인 차트 indicator
- 차트 도움말 제공
- data가 업데이트될 때, 애니메이션
