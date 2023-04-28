import {
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

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([height - bottom, top]);

  const xScale = scaleLinear()
    .domain([0, 100])
    .range([left, width - right]);

  const colorScale = scaleOrdinal(schemeCategory10);
  const topBottom = top + bottom;

  useEffect(() => {
    if (!rectRef.current || !textRef.current || !data) return;
    const getYPos = (d: res.Success<number>) => yScale(yValue(d)) || 0;

    select(rectRef.current)
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr(
        'fill',
        (d) => `${colorScale(yValue(d).toString())}${TRANSPARENT_40}`,
      )
      .attr('width', (d) => xScale(+yValue(d)) - left)
      .attr('height', yScale.bandwidth() - topBottom)
      .attr('x', left)
      .attr('y', (d) => getYPos(d) + topBottom / 2);

    select(textRef.current)
      .selectAll('text')
      .data(data)
      .join('text')
      .text(textValue)
      .attr('x', left + 10)
      .attr('y', (d) => getYPos(d) + topBottom * 0.925);
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
