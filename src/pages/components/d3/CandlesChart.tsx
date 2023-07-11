import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as d3fc from 'd3fc';

export interface CandlestickData {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
}

const CandlestickChart: React.FC<{ data: CandlestickData[]; width: number; height: number }> = ({ data, width, height }) => {
    const chartRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;
        const margin = { top: 50, right: 30, bottom: 30, left: 40 };
        // Create the x scale for dates
        const xScale = d3.scaleTime().range([margin.left, width]);

        // Create the y scale for prices
        const yScale = d3.scaleLinear().range([height, margin.left]);

        // Create the color scale for candlesticks
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        // Create the x and y axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        // Create the candlestick geometry generator
        const candlestick = d3fc
            .seriesSvgCandlestick()
            .xScale(xScale)
            .yScale(yScale)
            .crossValue((d: CandlestickData) => d.date)
            .openValue((d: CandlestickData) => d.open)
            .highValue((d: CandlestickData) => d.high)
            .lowValue((d: CandlestickData) => d.low)
            .closeValue((d: CandlestickData) => d.close);

        // Update the scales based on the data
        xScale.domain(d3.extent(data, (d) => d.date) as [Date, Date]).nice();
        yScale.domain([d3.min(data, (d) => d.low)!, d3.max(data, (d) => d.high)!]).nice();

        // Create the chart SVG element
        const svg = d3.select(chartRef.current);

        // Remove any existing elements from the chart
        svg.selectAll('*').remove();

        svg.append('g').attr('class', 'x-axis').attr('transform', `translate(0, ${height})`).call(xAxis);
        svg.append('g').attr('class', 'y-axis').attr('transform', `translate(${margin.left}, 0)`).call(yAxis);
        
        // Append the candlesticks to the chart
        svg.append('g').datum(data).call(candlestick);

        // Apply styles to the candlesticks
        svg.selectAll('.candle').style('fill', (d, i: any) => colorScale(i));
    }, [data, width, height]);

    return <svg ref={chartRef} width={width + 60} height={height + 40}>
        <g className="x-axis" />
        <g className="y-axis" />
    </svg>;
};

export default CandlestickChart;


