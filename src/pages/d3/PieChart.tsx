import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import { IPieCoinPrice } from '../Coin/interfaces';

const PieChart: React.FC<{ data: IPieCoinPrice[]; width: number; height: number }> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const fontSize = 11;
  const chartWidth = width - 50;
  const chartHeight = height - 50;

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      // .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("viewBox", [-chartWidth / 2, -chartHeight / 2, chartWidth, chartHeight])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    // const radius = Math.min(width, height) / 2;
    const radius = Math.min(chartWidth, chartHeight) / 2;

    const color = d3.scaleOrdinal<string>()
      .domain(data.map((d) => d.label))
      .range(d3.schemeCategory10);

    const pie = d3.pie<IPieCoinPrice>()
      .value((d) => d.value);

    const arc = d3.arc<d3.PieArcDatum<IPieCoinPrice>>()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = svg.selectAll<SVGPathElement, d3.PieArcDatum<IPieCoinPrice>>('path')
      .data(pie(data))
      .join('path')
      .attr('d', (d) => arc(d))
      .attr('fill', (d) => color(d.data.label));

    // const text = svg.selectAll<SVGTextElement, d3.PieArcDatum<IPieCoinPrice>>('text')
    //   .data(pie(data))
    //   .join('text')
    //   .attr('transform', (d) => `translate(${arc.centroid(d)})`)
    //   .attr('dy', '0.35em')
    //   .text((d) => d.data.label);

    const text = svg.selectAll<SVGTextElement, d3.PieArcDatum<IPieCoinPrice>>('text')
  .data(pie(data))
  .join('text')
  .attr('transform', (d) => {
    const [x, y] = arc.centroid(d);
    const angle = Math.atan2(y, x);
    const radius = arc.outerRadius()(d) + 15; // Відстань між текстом і сектором
    const newX = radius * Math.cos(angle);
    const newY = radius * Math.sin(angle);
    return `translate(${newX}, ${newY})`;
  })
  .attr('dy', '0.35em')
  .text((d) => d.data.label)
  .style('font-size', `${fontSize}px`);


const lines = svg.selectAll<SVGLineElement, d3.PieArcDatum<IPieCoinPrice>>('line')
  .data(pie(data))
  .join('line')
  .attr('x1', (d) => arc.centroid(d)[0])
  .attr('y1', (d) => arc.centroid(d)[1])
  .attr('x2', (d) => {
    const [x, y] = arc.centroid(d);
    const angle = Math.atan2(y, x);
    const radius = arc.outerRadius()(d) + 5; // Відстань риски від сектору
    return radius * Math.cos(angle);
  })
  .attr('y2', (d) => {
    const [x, y] = arc.centroid(d);
    const angle = Math.atan2(y, x);
    const radius = arc.outerRadius()(d) + 5; // Відстань риски від сектору
    return radius * Math.sin(angle);
  })
  .attr('stroke', 'black');

    return () => {
      svg.selectAll('*').remove();
    };
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default PieChart;
