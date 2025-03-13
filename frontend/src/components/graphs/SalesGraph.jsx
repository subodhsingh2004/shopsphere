import React from 'react'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import useTheme from '../../contexts/Theme';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// function to calculate last 6 months 
function getLastSixMonths() {

    const months = [];
    const date = new Date();

    for (let i = 6; i > 0; i--) {
        date.setMonth(date.getMonth() - 1);
        const monthName = date.toLocaleString('default', { month: 'short' });
        months.unshift(monthName);
    }

    return months;
}

function SalesGraph() {

    const { themeMode } = useTheme();

    const data = {
        labels: getLastSixMonths(),
        datasets: [
            {
                label: 'My Dataset', // Label for the line
                data: [12, 69, 33, 25, 42, 30], // Data points for the line
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
                ticks: {
                    stepSize: 5,
                },
            },
        },
    };

    return (

        <Line data={data} options={options} />

    )
}

export default SalesGraph