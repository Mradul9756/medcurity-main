import React from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { Chart as ChartJS,
    PieController,
    ArcElement
   } from 'chart.js';

ChartJS.register(PieController, ArcElement); // Register our line chart

const GraphContainer = styled.div`
    height: 100%;
    width: 100%;
`;

const PieChartBBType = ({graphContainer, filterBreachData, startDate, endDate}) => {

    // Final data to display
    const indvidualsAffected = [];
    const breachTypeLabels = [];
    // Function to get points that we will store into the final data arrays
    function getDataPoints() {
        // This will hold data filtered by date
        const dateFilteredData = [];
        // For each map in the filteredBreachData array
        for(let i = 0; i < filterBreachData.length; i++) {
            // get a datastring of the breach submission date for that map
            const dateString = filterBreachData[i]['breach_submission_date'];
            // create date object to get the month/day/year parsed for us
            const dateObj = new Date(dateString);
            // setting the values to 'month' 'day' and 'year' for datapoint to turn into timestamp
            let dataPoint = {
                'month' : dateObj.getMonth() + 1,  // Plus 1 because January is 0
                'day' : dateObj.getDate(),
                'year' : dateObj.getFullYear(),
            }
            // THEN Convert current data point date to Unix timestamp
            const currentTimestamp = Date.parse(`${dataPoint['year']}-${dataPoint['month']}-${dataPoint['day']}`);
            // Finally, we use the unixtimestamps of minDate & maxDate to see if the unixtimestamp of the current data point is within the range
            if (currentTimestamp >= startDate && currentTimestamp <= endDate) {
                // If it does, then we push to our dateFilteredData
                dateFilteredData.push(filterBreachData[i]);
            }
        }
        // This will first go through all of our filtered breach data, and find all of the unique breach locations for our labels.
        dateFilteredData.forEach(breach => {
            // Hold our data points
            const breach_location = breach['type_of_breach'];
            const indivuduals_affected = breach['individuals_affected'];
            // If it doesnt exist, then push and add indivduals affected
            if(!breachTypeLabels.includes(breach_location)){
                breachTypeLabels.push(breach_location);
                indvidualsAffected.push(indivuduals_affected)
            } 
            else {
                // Get the index of the location
                const index = breachTypeLabels.indexOf(breach_location);
                indvidualsAffected[index] = indvidualsAffected[index] + indivuduals_affected;
            }
        });     
    }

    getDataPoints();
    
    const data = {
        labels: breachTypeLabels,
        datasets: [
            {
                label: 'Type of Breach',
                data: indvidualsAffected,
                backgroundColor: ['rgba(35,115, 169,1.0)', 'rgba(25,83,131,1.0)', 'rgba(27,90,140,1.0)', 
                'rgba(30,98,149,1.0)', 'rgba(32,105,158,1.0)', 'rgba(34,111,165,1.0)', 'rgba(35,115,169,1.0)'],
                // BELOW IS FOR A GRADIENT STYLIED PI CHART DISPLAY
                // backgroundColor: function (context) {
                //     const chart = context.chart;
                //     const {ctx, chartArea} = chart;
                //     if (!chartArea) { return null; } // This case happens on initial chart load
                //     const centerX = (chartArea.left + chartArea.right) / 2;
                //     const centerY = (chartArea.top + chartArea.bottom) / 2;
                //     const radius = Math.min(chartArea.right - centerX, chartArea.bottom - centerY);
                //     const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
                //     gradient.addColorStop(0, 'rgba(187, 225, 250, 1)');
                //     gradient.addColorStop(.8 , 'rgba(50, 130, 184, 1)');
                //     gradient.addColorStop(1, 'rgba(15, 76, 117, .8)');
                //     return gradient;
                // },
                borderColor: 'hsla(0,0%,100%,0.2)',
                borderWidth: .5,
                pointBorderWidth: 2,
                pointBorderColor: 'hsla(0,0%,100%,0.5)',
                tension: 0.4,
                hoverOffset: 40,
                fill: true,
            },
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
            legend: {
                display: true,
                position: 'right', 
            },
        },
        layout: {
            padding: 40,
        }
    };
    return (
        <>
            <GraphContainer className="graphContainer" {...graphContainer}>
                <Pie
                    data={data}
                    options={options}
                    display={'flex'}
                />
            </GraphContainer>
        </>
    );
};

export default PieChartBBType;