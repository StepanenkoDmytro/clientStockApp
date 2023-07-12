// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// interface GaugeConfig {
//   size: number;
//   clipWidth: number;
//   clipHeight: number;
//   ringInset: number;
//   ringWidth: number;
//   pointerWidth: number;
//   pointerTailLength: number;
//   pointerHeadLengthPercent: number;
//   minValue: number;
//   maxValue: number;
//   minAngle: number;
//   maxAngle: number;
//   transitionMs: number;
//   majorTicks: number;
//   labelFormat: (d: number) => string;
//   labelInset: number;
//   arcColorFn: d3.ScaleSequential<string>;
// }

// interface GaugeProps {
//   value: number;
//   config: GaugeConfig;
// }

// const Gauge: React.FC<GaugeProps> = ({ value, config }) => {
//   const containerRef = useRef<SVGSVGElement | null>(null);
//   const svgRef = useRef<SVGGElement | null>(null);

//   useEffect(() => {
//     const gauge = createGauge(containerRef.current, config);
//     gauge.render();

//     return () => {
//       // Cleanup code if needed
//     };
//   }, [config]);

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);
//     const gauge = svg.select('.pointer');
//     const ratio = gaugeScale(value, config);

//     const newAngle = config.minAngle + ratio * (config.maxAngle - config.minAngle);
//     gauge
//       .transition()
//       .duration(config.transitionMs)
//       .ease(d3.easeElastic)
//       .attr('transform', `rotate(${newAngle})`);
//   }, [value, config]);

//   return <svg ref={containerRef} className="gauge" width={config.clipWidth} height={config.clipHeight}>
//     <g ref={svgRef} transform={`translate(${config
