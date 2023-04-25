import {
  axisBottom,
  axisLeft,
  curveMonotoneX,
  extent,
  line,
  scaleLinear,
  scaleTime,
  select,
  timeFormat,
} from 'd3';
import { useEffect, useRef } from 'react';

export default function useAgentThreadChart(
  data: res.Success<res.IndividualAgent> | null,
) {
  const chartRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!chartRef.current || !data) return;
    const svg = select(chartRef.current)
      .call((g) => g.select('svg').remove())
      .append('svg')
      .attr('viewBox', '0 0 700 700');
    const { oids, objects } = data.data;
    const seriesValues = objects[0].series;
    const xDate = ([x, _]: [number, number]) => new Date(x);
    const yValue = ([_, y]: [number, number]) => y;
    const [xMin, xMax] = extent(seriesValues, xDate);
    const [yMin, yMax] = extent(seriesValues, yValue);

    const xScale = scaleTime()
      .domain([xMin || 0, xMax || 0])
      .range([0, 700]);
    const xAxis = axisBottom(xScale)
      .ticks(objects[0].series.length - 1)
      .tickFormat(timeFormat('%H:%M'));
    const yScale = scaleLinear()
      .domain([yMin || 0, yMax || 0])
      .range([700, 0]);
    const yAxis = axisLeft(yScale).ticks(10);

    const makeLine = line()
      .x((v) => xScale(xDate(v)))
      .y((v) => yScale(yValue(v)))
      .curve(curveMonotoneX);

    svg
      .append('g')
      .attr('fill', `black`)
      .attr('transform', `translate(0, ${700 - 40})`)
      .call(xAxis, 0); // draw x axis
    svg.append('g').attr('transform', `translate(40, 0)`).call(yAxis); // draw y axis

    oids.forEach((oid) => {
      // draw lines & circles
      const series = objects.find((obj) => obj.oid === oid)?.series;
      if (series) {
        svg
          .append('path')
          .datum(series)
          .attr('fill', 'none')
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 1.5)
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('d', (data) => makeLine(data));
        series.forEach((data) =>
          svg
            .append('circle')
            .attr('r', '4')
            .attr('color', 'steelblue')
            .attr('cx', xScale(xDate(data)))
            .attr('cy', yScale(yValue(data))),
        );
      }
    });
  }, [data]);
  return chartRef;
}
