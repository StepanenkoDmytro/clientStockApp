import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import { IDataPieChart } from '../Coin/interfaces';

const PieChart: React.FC<{ data: IDataPieChart[]; width: number; height: number }> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal<string>()
      .domain(data.map((d) => d.label))
      .range(d3.schemeCategory10);

    const pie = d3.pie<IDataPieChart>()
      .value((d) => d.value);

    const arc = d3.arc<d3.PieArcDatum<IDataPieChart>>()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = svg.selectAll<SVGPathElement, d3.PieArcDatum<IDataPieChart>>('path')
      .data(pie(data))
      .join('path')
      .attr('d', (d) => arc(d))
      .attr('fill', (d) => color(d.data.label));

    const text = svg.selectAll<SVGTextElement, d3.PieArcDatum<IDataPieChart>>('text')
      .data(pie(data))
      .join('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .text((d) => d.data.label);

    return () => {
      svg.selectAll('*').remove();
    };
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default PieChart;
