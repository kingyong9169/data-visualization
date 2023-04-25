import {
  axisBottom,
  axisLeft,
  curveMonotoneX,
  extent,
  line,
  scaleLinear,
  scaleOrdinal,
  scaleTime,
  schemeCategory10,
  select,
  timeFormat,
} from 'd3';
import { useEffect, useRef } from 'react';

type StyleParams = {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};

export default function useAgentThreadChart(
  data: res.Success<res.IndividualAgent> | null,
  { width, height, margin }: StyleParams,
) {
  const { top, right, bottom, left } = margin;
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;
    const { oids, objects } = data.data;

    const svg = select(chartRef.current)
      .call((g) => g.select('svg').remove())
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`);

    const seriesDates = objects[0].series;
    const seriesValues = objects.map(({ series }) => [...series]).flat();
    const xDate = ([x, _]: [number, number]) => new Date(x);
    const yValue = ([_, y]: [number, number]) => y;
    const [xMin, xMax] = extent(seriesDates, xDate);
    const [yMin, yMax] = extent(seriesValues, yValue);

    const xScale = scaleTime()
      .domain([xMin || 0, xMax || 0])
      .range([left, width - right]);
    const xAxis = axisBottom(xScale)
      .ticks(objects[0].series.length)
      .tickFormat(timeFormat('%H:%M'));
    const yScale = scaleLinear()
      .domain([yMin || 0, yMax || 0])
      .range([height - bottom, top]);
    const yAxis = axisLeft(yScale).ticks(10);
    const colorScale = scaleOrdinal(schemeCategory10);

    const makeLine = line()
      .x((v) => xScale(xDate(v)))
      .y((v) => yScale(yValue(v)))
      .curve(curveMonotoneX);

    svg
      .append('g')
      .attr('fill', `black`)
      .attr('transform', `translate(0, ${height - bottom})`)
      .call(xAxis, 0); // draw x axis
    svg.append('g').attr('transform', `translate(${left}, ${0})`).call(yAxis); // draw y axis

    oids.forEach((oid) => {
      // draw lines
      const series = objects.find((obj) => obj.oid === oid)?.series;
      if (series) {
        svg
          .append('path')
          .datum(series)
          .attr('fill', 'none')
          .attr('stroke', (data) => colorScale(data[0].toString()))
          .attr('stroke-width', 1.5)
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('d', (data) => makeLine(data));
      }
    });
  }, [data, width, height, top, right, bottom, left]);
  return chartRef;
}
