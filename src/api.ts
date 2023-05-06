/* eslint-disable import/no-anonymous-default-export */
import {
  ApiKind,
  OpenAPIHeaders,
  OpenAPIObj,
  OpenAPIParamType,
  OpenAPIParams,
  OpenAPIType,
  ParsedOpenAPIInfo,
} from './types/openApiTypes';

const DEMO_PROJECT_API_TOCKEN = 'XGJHUSQZTI2AVIENWA27HI5V';
const DEMO_PROJECT_CODE = 5490;
const OPEN_API_HEADERS: OpenAPIHeaders = {
  'x-whatap-pcode': DEMO_PROJECT_CODE.toString(),
  'x-whatap-token': DEMO_PROJECT_API_TOCKEN,
};

const OPEN_API_ROOT = 'https://api.whatap.io/open/api';
const AGENT_API_ROOT = 'https://api.whatap.io/open';

const OPEN_API: OpenAPIObj = {
  '': {
    act_agent: '활성화 상태의 에이전트 수',
    inact_agent: '비활성화 상태의 에이전트 수',
    host: '호스트 수',
    cpucore: '호스트의 CPU 코어 합',
    txcount: '트랜잭션 수',
    tps: '초당 트랜잭션 수',
    user: '5분간 집계된 고유 사용자 수',
    actx: '액티브 트랜잭션 수',
    rtime: '평균 응답 시간(ms)',
    cpu: 'CPU 사용률',
    threadpool_active: '쓰레드풀 활성 쓰레드 수',
    threadpool_queue: '쓰레드풀 큐잉 쓰레드 수',
    dbc_count: '전체 DB Connection 수',
    dbc_active: '활성(Active) DB Connection 수',
    dbc_idle: '비활성(Idle) DB Connection 수',
    act_method: '액티브 Method 수',
    act_sql: '액티브 SQL 수',
    act_httpc: '액티브 HTTP Call 수',
    act_dbc: '액티브 DB Connection 수',
    act_socket: '액티브 Socket 수',
    'tag/db_pool_detail/dbconn?stime={stime}&etime={etime}&timeMerge=avg':
      '프로젝트 내 데이터 소스별 DB Connection 수',
  },
  json: {
    'exception/{stime}/{etime}': 'Exception 발생 ',
    'heap_use/{stime}/{etime}/avg': '평균 Heap 사용량',
    'heap_use/{stime}/{etime}/max': '최대 Heap 사용량',
    'thread_count/{stime}/{etime}': '데이터 개별 쓰레드 개수',
    'thread_count/{stime}/{etime}/avg': '데이터 평균 쓰레드 개수',
    'thread_daemon/{stime}/{etime}': '데이터 개별 쓰레드 대몬 개수',
    'thread_daemon/{stime}/{etime}/avg': '데이터 평균 쓰레드 대몬 개수',
    'thread_peak_count/{stime}/{etime}': '데이터 개별 쓰레드 피크 개수',
    'thread_peak_count/{stime}/{etime}/avg': '데이터 평균 쓰레드 피크 개수',
    'threadpool_active/{stime}/{etime}': '데이터 개별 활성 쓰레드풀 개수',
    'threadpool_active/{stime}/{etime}/avg': '데이터 평균 활성 쓰레드풀 개수',
    'threadpool_queue/{stime}/{etime}': '데이터 개별 쓰레드풀 큐 개수',
    'threadpool_queue/{stime}/{etime}/avg': '데이터 평균 쓰레드풀 큐 개수',
    agents: '에이전트 목록',
  },
  raw: {
    'tag/app_counter/tps?stime={stime}&etime={etime}&timeMerge=avg': 'TPS(개)',
    'tag/app_counter/resp_time?stime={stime}&etime={etime}&timeMerge=avg':
      '평균 응답 시간(s)',
    'tag/app_host_resource/cpu?stime={stime}&etime={etime}&timeMerge=avg':
      '평균 CPU 사용률(%)',
  },
};

const getPath = (
  url: string,
  param: OpenAPIParams = {
    stime: '',
    etime: '',
  },
) => {
  let path = url;
  for (const key in param) {
    path = path.replace(
      new RegExp('\\{' + key + '\\}', 'g'),
      param[key as OpenAPIParamType].toString(),
    );
  }

  return path;
};

export type ApiRequest = {
  key: string;
  param?: OpenAPIParams;
};

export const getOpenApi =
  (type: OpenAPIType, apiKind: ApiKind = 'open') =>
  async <T>(key: string, param?: OpenAPIParams) => {
    const apiRoot = apiKind === 'open' ? OPEN_API_ROOT : AGENT_API_ROOT;
    const apiInfo = new Promise<ParsedOpenAPIInfo>((resolve, reject) => {
      if (key in OPEN_API[type]) {
        return resolve({
          url: [apiRoot, type, key].filter((path) => !!path).join('/'),
          name: OPEN_API[type][key],
        });
      } else {
        reject('잘못된 API 정보');
      }
    });

    try {
      const { url, name } = await apiInfo;
      const response = await fetch(getPath(url, param), {
        headers: OPEN_API_HEADERS,
      });
      const data: res.Success<T> = await response.json();
      return {
        key,
        name,
        data,
      };
    } catch (err: any) {
      throw new Error(err);
    }
  };

const spot = getOpenApi('');
const series = getOpenApi('json');

export default { spot, series };
