import { useEffect, useState } from 'react';

import api from './api';

const HOUR = 1000 * 60 * 60;

function App() {
  const [httpcSeries, setHttpcSeries] = useState<res.IndividualAgent>();

  useEffect(() => {
    api
      .series<res.IndividualAgent>('thread_count/{stime}/{etime}/avg', {
        stime: Date.now() - HOUR,
        etime: Date.now(),
      })
      .then(({ data }) => setHttpcSeries(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Open API (Application)</h1>
      <a
        href="https://docs.whatap.io/kr/appendix/open_api_application.pdf"
        target="_blank"
        rel="noreferrer"
      >
        가이드 문서
      </a>
      <h2>프로젝트 API 예시</h2>
      <h3>Spot 정보 조회 URL</h3>
      <hr />
      <h3>통계 정보 조회 URL</h3>
      <pre>{JSON.stringify(httpcSeries, null, 4)}</pre>
    </div>
  );
}

export default App;
