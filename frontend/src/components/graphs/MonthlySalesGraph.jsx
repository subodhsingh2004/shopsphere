import React, { useState } from 'react'
import { Line } from 'react-chartjs-2';
import useTheme from '../../contexts/Theme';

const currentDate = new Date();
const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
const firstDayOfMonth = firstDay.getDate();
const lastDayOfMonth = lastDay.getDate();
const month = firstDay.toLocaleString('default', { month: 'long' });

function MonthlySalesGraph({ salesData }) {
    
    const getData = () => {
        let dayData = []
        for (let day = firstDayOfMonth; day <= lastDayOfMonth; day++) {
            let isFound = false
            for(let index = 0; index< salesData.length; index++ ){
                if(salesData[index].day == day) {
                    dayData.push(salesData[index].totalSales)
                    isFound = true
                }
            }
            if(!isFound) dayData.push(0)
        }

        return dayData
    }

    const getLabels = () => {
        let label = [];
        for (let index = firstDayOfMonth; index <= lastDayOfMonth; index++) {
            label.push(index)
        }
        return label
    }
    const { themeMode } = useTheme()

    const data = {
        labels: getLabels(),
        datasets: [
            {
                label: month, // Label for the line
                data: getData(), // Data points for the line
                borderColor: '#3772ff', // Line color
                backgroundColor: '#3772ff', // Line fill color (if applicable)
                tension: .1, // Curvature of the line
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: themeMode === 'dark' ? 'white' : 'black',
                }
            },
        },
        scales: {
            x: {
                ticks: {
                    color: themeMode === 'dark' ? 'white' : 'black',
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (

        <Line data={data} options={options} />

    )
}

export default MonthlySalesGraph