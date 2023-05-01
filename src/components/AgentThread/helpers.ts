export function isAvgThreadData(
  data: res.Success<res.AverageAgent> | res.Success<res.IndividualAgent>,
): data is res.Success<res.AverageAgent> {
  return !!(data.data as res.AverageAgent).series;
}

export function refinedData(
  data: res.Success<res.AverageAgent> | res.Success<res.IndividualAgent> | null,
): res.AgentData[][] {
  if (!data) return [[[0, 0]]];
  return isAvgThreadData(data)
    ? [data.data.series]
    : data.data.objects.map(({ series }) => series);
}
