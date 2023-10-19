import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Line, getElementAtEvent } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler); // Register our line chart

const LineGraphContainer = styled.div`
    width: 100%;
    height: 100%;
`;

/* Do not modifiy this without notifying the rest of the group, as it will affect the main page layout if height and width elements are changed */
const WideLineGraphDisp = ({filterBreachData, startDate, endDate, setRawDataToDisplay, rawDataToDisplay}) => {
    let indviduals = [];
    let dateLabels = [];
    let finalBreachData = [];

    // console.log(`Start Date: ${startDate}`);
    // console.log(`End Date: ${endDate}`);
    
    function getDataPoints() {
        for(let i = 0; i < filterBreachData.length; i++) {
            const indviduals_affected = filterBreachData[i]['individuals_affected'];
            const dateString = filterBreachData[i]['breach_submission_date'];
            const dateObj = new Date(dateString);

            let dataPoint = {
                'indviduals_affected' : indviduals_affected,
                'month' : dateObj.getMonth() + 1,
                'day' : dateObj.getDate(),
                'year' : dateObj.getFullYear(),
                'date' : dateString
            }

            // Convert current data point date to Unix timestamp
            const currentTimestamp = Date.parse(`${dataPoint['year']}-${dataPoint['month']}-${dataPoint['day']}`);

            // Check if current date falls within the min and max date range
            if (currentTimestamp >= startDate && currentTimestamp <= endDate) {
                indviduals.push(dataPoint['indviduals_affected']);
                dateLabels.push(dataPoint['date']);
                finalBreachData.push(filterBreachData[i])
            }
        }

        indviduals = indviduals.reverse();
        dateLabels = dateLabels.reverse();
        finalBreachData = finalBreachData.reverse();
    }

    getDataPoints();
    
    const data = {
        labels: dateLabels,
        datasets: [
            {
                label: 'Individuals Affected',    
                data: indviduals,
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;
                    if (!chartArea) { return null; } // This case happens on initial chart load
                    const gradient = ctx.createLinearGradient( chartArea.left, chartArea.bottom, chartArea.left, chartArea.top );
                    gradient.addColorStop(0.02, 'rgba(255, 255, 255, 0.0)');
                    gradient.addColorStop(1, 'rgba(0, 150, 255, .55)');
                    return gradient;
                },
                borderColor: 'hsla(0,0%,100%,0.3)',
                borderWidth: 2,
                pointBorderWidth: 3,
                pointBorderColor: 'hsla(0,0%,100%,0.7)',
                tension: 0.4,
                fill: true,
            }
        ]
    };
    
    const options = {
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
            axis: 'x',
        },
        plugins: {
            tooltip: {
                enabled: true,
            },
            legend: false // displays what each line represents
        },
        scales: {
            y: {
                // min: 3,
                // max: 6
                grid: {
                    drawBorder: false, // removes the border around the graph
                    drawOnChartArea: false, // the grid lines in the graph
                },
                ticks: {
                    display: false,
                }
            },
            x: {
                // min: 3,
                // max: 6
                grid: {
                    drawBorder: false,
                    borderDash: [6],
                    border: false, // removes the border around the graph
                    drawOnChartArea: false, // the grid lines in the graph
                },
                ticks: {
                    display: false,
                }
            }
        }
    };

    const chartRef = useRef()
    const onClick = (event) => {
        const element = getElementAtEvent(chartRef.current, event);
        

        if (typeof element[0] !== 'undefined') {
            const index = element[0].index
            const breach = finalBreachData[index];
            
            const isBreachExists = rawDataToDisplay.some(data => data === breach);

            if(!isBreachExists) {
                setRawDataToDisplay(prevData => [...prevData, breach]);
            }
        }
    };
    

    return (
        <LineGraphContainer>
            {/* We define our styles first, then the chart after
            - Having some issues atm where the graph wont stretch the full width if you say width 100% */}
            <Line
                data={data}
                options={options}
                display={'flex'}
                onClick={onClick}
                ref={chartRef}
            ></Line>
        </LineGraphContainer>
    );
};
export default WideLineGraphDisp;