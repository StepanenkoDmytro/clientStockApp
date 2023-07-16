import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './pie.css';

import { IPiePrice } from '../../markets/coinMarket/interfaces';

const PieChart: React.FC<{ data: IPiePrice[]; width: number; height: number }> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const chartWidth = width - 50;
  const chartHeight = height - 50;

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height + 30)
      .attr("viewBox", [-chartWidth / 2, -chartHeight / 2, chartWidth, chartHeight])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const radius = Math.min(chartWidth, chartHeight) / 2;

    const color = d3.scaleOrdinal<string>()
      .domain(data.map((d) => d.label))
      .range(d3.schemeCategory10);

    const pie = d3.pie<IPiePrice>()
      .value((d) => d.value);

    const arc = d3.arc<d3.PieArcDatum<IPiePrice>>()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = svg.selectAll<SVGPathElement, d3.PieArcDatum<IPiePrice>>('path')
      .data(pie(data))
      .join('path')
      .attr('d', (d) => arc(d))
      .attr('fill', (d) => color(d.data.label));

    const sum = d3.sum(data, (d) => d.value); // Calculate the total sum of values

    const text = svg.selectAll<SVGTextElement, d3.PieArcDatum<IPiePrice>>('text')
      .data(pie(data))
      .join('text')
      .attr('transform', (d) => {
        const centroid = arc.centroid(d);
        const angle = Math.atan2(centroid[1], centroid[0]);
        const appendToRadius = 3 / ((d.data.value / sum) * 100) * 11;
        const radius = (d.data.value / sum) * 100 > 3 ? arc.outerRadius()(d) + 10 : arc.outerRadius()(d) + appendToRadius; // Distance between text and sector
        const textX = radius * Math.cos(angle);
        const textY = radius * Math.sin(angle);
        const textAnchor = angle > Math.PI / 2 || angle < -Math.PI / 2 ? 'end' : 'start';
        return `translate(${textX}, ${textY})`;
      })
      .attr('dy', '0.35em')
      .text((d) => `${((d.data.value / sum) * 100).toFixed(0)}%`)
      .style('font-size', `11px`)
      .style('fill', 'white')
      .style('text-anchor', (d) => {
        const centroid = arc.centroid(d);
        const angle = Math.atan2(centroid[1], centroid[0]);
        return angle > Math.PI / 2 || angle < -Math.PI / 2 ? 'end' : 'start';
      })
      .style('fill', (d) => color(d.data.label));

      const table = d3.select(tableRef.current); // Retrieve the table using tableRef

      const row = table.selectAll('tr')
          .data(data)
          .enter()
          .append('tr');

          row.append('td')
          .append('span')
          .style('display', 'inline-block')
          .style('width', '10px')
          .style('height', '10px')
          .style('background-color', (d) => color(d.label))
          .style('margin-right', '5px');
      
      row.append('td')
          .text((d) => d.label)
          .style('font-size', '16px')
          .style('color', 'rgb(160, 159, 162)'); 

    return () => {
      svg.selectAll('*').remove();
    };
  }, [data]);

  return (
    <div className="pie">
      <svg ref={svgRef}></svg>
      <div className="list-container">
      <table ref={tableRef}></table>
      </div>
    </div>
  );
}

export default PieChart;
