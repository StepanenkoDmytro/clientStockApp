import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './guage.css'

interface GaugeProps {
    value: number;
    gaugeMaxValue: number;
}

interface TableItem {
    label: string;
}

const Gauge: React.FC<GaugeProps> = ({ value, gaugeMaxValue }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const tableRef = useRef<HTMLTableElement>(null);

    useEffect(() => {
        const width = 270;
        // const height = 200;
        const margin = 20;
        const radius = width / 2 - margin;
        const height = radius * 2;


        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', radius + margin);

        const chart = svg.append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const arc = d3.arc()
            .innerRadius(radius * 0.7)
            .outerRadius(radius)
            .startAngle(-Math.PI / 2)
            .endAngle(Math.PI / 2);

        const arc1 = d3.arc()
            .innerRadius(radius * 0.7)
            .outerRadius(radius)
            .startAngle(-Math.PI / 2)
            .endAngle(-Math.PI / 6);

        const arc2 = d3.arc()
            .innerRadius(radius * 0.7)
            .outerRadius(radius)
            .startAngle(-Math.PI / 6)
            .endAngle(Math.PI / 6);

        const arc3 = d3.arc()
            .innerRadius(radius * 0.7)
            .outerRadius(radius)
            .startAngle(Math.PI / 6)
            .endAngle(Math.PI / 2);

        const path1 = chart.append('path')
            .attr('d', arc1 as any)
            .attr('fill', 'rgb(178, 41, 34)');

        const path2 = chart.append('path')
            .attr('d', arc2 as any)
            .attr('fill', 'rgb(185, 187, 38)');

        const path3 = chart.append('path')
            .attr('d', arc3 as any)
            .attr('fill', 'rgb(27, 135, 91)');


        const range = d3.scaleLinear()
            .domain([0, gaugeMaxValue])
            .range([-Math.PI / 2, Math.PI / 2]);

        const valueAngle = range(value * (180 / Math.PI));

        chart.append('line')
            .attr('class', 'needle-line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', -radius * 0.9)
            .attr('y2', 0)
            .attr('transform', `rotate(${valueAngle})`)
            .style('stroke', 'rgb(160, 159, 162)')
            .style('stroke-width', 2);

        // const tableData: TableItem[] = [
        //     { label: 'Now - значення ' + value },
        //     { label: 'Yestarday - 70' },
        //     { label: 'Last week - 66' },
        //     { label: 'Last month - 80' },
        // ];

        // const table = d3.select(tableRef.current);
        // const rows = table.selectAll('tr')
        //     .data(tableData)
        //     .enter()
        //     .append('tr');

        // rows.append('td')
        //     .text((d) => d.label);

    }, [value, gaugeMaxValue]);

    return (
        <div className="pie">
            <svg ref={svgRef}></svg>
            <div className="list-container">
                <table className='gauge-table'>
                    <tbody>
                        <tr>
                            <td>
                                <p>Now:</p>
                            </td>
                            <td id='values'>
                                <p>{value}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Yestarday:</p>
                            </td>
                            <td id='values'>
                                <p>70</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Last week:</p>
                            </td>
                            <td id='values'>
                                <p>66</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Last month:</p>
                            </td>
                            <td id='values'>
                                <p>80</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Gauge;

