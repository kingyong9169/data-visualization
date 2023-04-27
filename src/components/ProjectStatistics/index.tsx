import useProjectStatistics from 'src/hooks/api/useProjectStatistics';

export default function ProjectStatistics() {
  const {
    data: tpsData,
    isLoading: tpsLoading,
    isFetching: tpsFetching,
  } = useProjectStatistics('raw', 'app_counter/tps');
  const {
    data: respData,
    isLoading: respLoading,
    isFetching: respFetching,
  } = useProjectStatistics('raw', 'app_counter/resp_time');
  const {
    data: cpuData,
    isLoading: cpuLoading,
    isFetching: cpuFetching,
  } = useProjectStatistics('raw', 'app_host_resource/cpu');
  const {
    data: dbConnData,
    isLoading: dbConnLoading,
    isFetching: dbConnFetching,
  } = useProjectStatistics('tag', 'db_pool_detail/dbconn');

  return (
    <div>
      <pre>{JSON.stringify(tpsData, null, 2)}</pre>
      <pre>{JSON.stringify(respData, null, 2)}</pre>
      <pre>{JSON.stringify(cpuData, null, 2)}</pre>
      <pre>{JSON.stringify(dbConnData, null, 2)}</pre>
    </div>
  );
}
