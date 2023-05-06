import { asyncKeys } from 'src/constants/asyncKeys';
import { HOUR } from 'src/constants/time';
import { AgentKind } from 'src/components/AgentThread/hooks';
import { AsyncTimeParams } from 'src/types/async';
import { getTimeDeps } from 'src/utils/isTimeExist';

import useAsync from '../useAsync';

function isAvgData(
  data: res.Success<res.AverageAgent> | res.Success<res.IndividualAgent>,
): data is res.Success<res.AverageAgent> {
  return !!(data as res.Success<res.AverageAgent>).data.objectMerge;
}

function useGetAgentThread(
  type: string,
  kind?: AgentKind,
  time: AsyncTimeParams = {},
) {
  const refinedKind = kind === 'avg' ? `/${kind}` : '';
  const key = `${type}/{stime}/{etime}${refinedKind}`;
  return useAsync<
    res.Success<res.AverageAgent> | res.Success<res.IndividualAgent>
  >(
    asyncKeys.agentThread(type, kind || '', getTimeDeps(time)),
    {
      type: 'json',
      key,
      needStime: true,
      needEtime: true,
      term: HOUR,
      sTime: time.sTime,
      eTime: time.eTime,
    },
    {
      lastEtime: (state) => {
        if (!state) return 0;
        return state.data.etime;
      },
      select: (state, data) => {
        if (!state) return data;
        const oids = [...new Set([...state.data.oids, ...data.data.oids])];
        if (isAvgData(data) && isAvgData(state)) {
          if (!data.data.series.length) return { ...state };
          return {
            ...data,
            data: {
              ...state.data,
              oids,
              etime: data.data.etime,
              series: [...state.data.series, ...data.data.series],
            },
          };
        }
        if (!isAvgData(data) && !isAvgData(state)) {
          if (!data.data.objects.length) return { ...state };
          const findOids: number[] = []; // 기존 oid들을 저장
          const objects = state.data.objects.map((object) => {
            // 기존 상태와 새로 들어온 data를 비교하여 oid가 같은 object가 있다면 series를 합친다.
            const target = data.data.objects.findIndex(
              (targetObject) => targetObject.oid === object.oid,
            );
            if (target === -1) return object;
            findOids.push(data.data.objects[target].oid);
            return {
              ...object,
              series: [...object.series, ...data.data.objects[target].series],
            };
          });
          const filteredObjects = data.data.objects.filter(
            (object) => !findOids.includes(object.oid),
          ); // 기존 상태에는 없는 oid를 가진 object를 찾아서 objects에 추가한다.
          return {
            ...data,
            data: {
              ...state.data,
              etime: data.data.etime,
              oids,
              objects: [...objects, ...filteredObjects],
            },
          };
        }
        return data;
      },
    },
  );
}

export default useGetAgentThread;
