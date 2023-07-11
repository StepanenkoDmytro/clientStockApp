import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  x: number;
  y: number;
}

interface Props {
  data: DataPoint[];
  width: number;
  height: number;
}

const AreaChart: React.FC<Props> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);

      const xExtent = d3.extent(data, d => d.x) as [number, number];
      const yExtent = d3.extent(data, d => d.y) as [number, number];
      
      const xScale = d3.scaleLinear()
        .domain(xExtent)
        .range([0, width]);
      
      const yScale = d3.scaleLinear()
        .domain(yExtent)
        .range([height, 0]);
      

      const area = d3.area<DataPoint>()
        .x(d => xScale(d.x))
        .y0(height)
        .y1(d => yScale(d.y));

      svg.append('path')
        .datum(data)
        .attr('d', area)
        .attr('fill', 'steelblue');
    }
  }, [data, width, height]);

  return (
    <svg ref={svgRef} width={width} height={height}></svg>
  );
};

export default AreaChart;
