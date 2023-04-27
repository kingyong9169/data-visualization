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
import { TRANSPARENT_40 } from 'src/constants/color';

export type CharStyleParams = {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};

export function useAgentThreadIndividualChart(
  data: res.Success<res.IndividualAgent> | null,
  { width, height, margin }: CharStyleParams,
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
      .ticks(5)
      .tickFormat(timeFormat('%H:%M'))
      .tickSizeOuter(0);
    const yScale = scaleLinear()
      .domain([yMin || 0, yMax || 0])
      .range([height - bottom, top]);
    const yAxis = axisLeft(yScale).ticks(5).tickSize(0).tickSizeOuter(0);
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
          .attr(
            'stroke',
            (data) => `${colorScale(data[0].toString())}${TRANSPARENT_40}`,
          )
          .attr('stroke-width', 1.5)
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('d', (data) => makeLine(data));
      }
    });
  }, [data, width, height, top, right, bottom, left]);
  return chartRef;
}

export function useAgentThreadAvgChart(
  data: res.Success<res.AverageAgent> | null,
  { width, height, margin }: CharStyleParams,
) {
  const { top, right, bottom, left } = margin;
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;
    const { series } = data.data;

    const svg = select(chartRef.current)
      .call((g) => g.select('svg').remove())
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`);

    const xDate = ([x, _]: [number, number]) => new Date(x);
    const yValue = ([_, y]: [number, number]) => y;
    const [xMin, xMax] = extent(series, xDate);
    const [yMin, yMax] = extent(series, yValue);

    const xScale = scaleTime()
      .domain([xMin || 0, xMax || 0])
      .range([left, width - right]);
    const xAxis = axisBottom(xScale)
      .ticks(4)
      .tickFormat(timeFormat('%H:%M'))
      .tickSizeOuter(0);
    const yScale = scaleLinear()
      .domain([yMin || 0, yMax || 0])
      .range([height - bottom, top]);
    const yAxis = axisLeft(yScale).ticks(5).tickSize(0).tickSizeOuter(0);
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

    svg
      .append('path')
      .datum(series)
      .attr('fill', 'none')
      .attr(
        'stroke',
        (data) => `${colorScale(data[0].toString())}${TRANSPARENT_40}`,
      )
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', (data) => makeLine(data));
  }, [data, width, height, top, right, bottom, left]);
  return chartRef;
}
