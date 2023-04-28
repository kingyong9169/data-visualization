import {
  curveMonotoneX,
  extent,
  line,
  scaleLinear,
  scaleOrdinal,
  scaleTime,
  schemeCategory10,
  select,
} from 'd3';
import { useEffect, useRef } from 'react';
import { TRANSPARENT_40 } from 'src/constants/color';
import { ChartStyleParams } from 'src/types/chart';

export function useLineChart(
  datas: res.AgentData[][],
  { width, height, margin }: ChartStyleParams,
) {
  const { top, right, bottom, left } = margin;
  const lineRef = useRef<SVGGElement | null>(null);

  const dateDatas = datas[0];
  const valueDatas = datas.flat();
  const xDate = ([x, _]: [number, number]) => new Date(x);
  const yValue = ([_, y]: [number, number]) => y;
  const [xMin, xMax] = extent(dateDatas, xDate);
  const [yMin, yMax] = extent(valueDatas, yValue);

  const xScale = scaleTime()
    .domain([xMin || 0, xMax || 0])
    .range([left, width - right]);

  const yScale = scaleLinear()
    .domain([yMin || 0, yMax || 0])
    .range([height - bottom, top]);

  useEffect(() => {
    if (!lineRef.current || !datas) return;
    const lineGroup = select(lineRef.current);
    select(lineRef.current)
      .selectAll('path')
      .call((g) => g.remove());

    const colorScale = scaleOrdinal(schemeCategory10);

    const makeLine = line()
      .x((v) => xScale(xDate(v)))
      .y((v) => yScale(yValue(v)))
      .curve(curveMonotoneX);

    datas.forEach((data) => {
      lineGroup
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr(
          'stroke',
          (data) => `${colorScale(data[0].toString())}${TRANSPARENT_40}`,
        )
        .attr('stroke-width', 1.5)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('d', (data) => makeLine(data));
    });
  }, [width, height, top, right, bottom, left, datas, xScale, yScale]);
  return { lineRef, xScale, yScale };
}
