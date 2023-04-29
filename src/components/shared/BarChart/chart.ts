import {
  max,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  schemeCategory10,
  select,
} from 'd3';
import { useEffect, useRef } from 'react';
import { TRANSPARENT_40 } from 'src/constants/color';
import { ChartStyleParams } from 'src/types/chart';

export function useBarChart(
  data: res.Success<number>[],
  { width, height, margin }: ChartStyleParams,
) {
  const { top, right, bottom, left } = margin;
  const textRef = useRef<SVGTextElement | null>(null);
  const rectRef = useRef<SVGRectElement | null>(null);
  const textValue = (d: res.Success<number>) => d.name;
  const yValue = (d: res.Success<number>) => d.data.toString();
  const notDuplicatedYValue = (d: res.Success<number>, i: number) =>
    d.data.toString() + '.'.repeat(i);

  const yScale = scaleBand()
    .domain(data.map((d, i) => d.data.toString() + '.'.repeat(i)))
    .range([height - bottom, top]);

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => +yValue(d)) || 0])
    .range([left, width - right]);

  const colorScale = scaleOrdinal(schemeCategory10);
  const topBottom = top + bottom;

  useEffect(() => {
    if (!rectRef.current || !textRef.current || !data) return;
    const getYPos = (d: res.Success<number>, i: number) =>
      yScale(notDuplicatedYValue(d, i)) || 0;

    select(rectRef.current)
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr(
        'fill',
        (d) => `${colorScale(yValue(d).toString())}${TRANSPARENT_40}`,
      )
      .attr('width', (d) => xScale(+yValue(d)) - left)
      .attr('height', yScale.bandwidth() / 1.5)
      .attr('x', left)
      .attr('y', (d, i) => getYPos(d, i) + yScale.bandwidth() / 6);

    select(textRef.current)
      .selectAll('text')
      .data(data)
      .join('text')
      .text(textValue)
      .attr('x', left + 10)
      .attr('y', (d, i) => getYPos(d, i) + yScale.bandwidth() / 1.7);
  }, [
    data,
    width,
    height,
    top,
    right,
    bottom,
    left,
    xScale,
    yScale,
    colorScale,
    topBottom,
  ]);
  return { textRef, yScale, rectRef };
}
