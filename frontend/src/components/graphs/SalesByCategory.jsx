import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import useTheme from '../../contexts/Theme';

ChartJS.register(ArcElement, Tooltip, Legend);

function SalesByCategory({ salesData }) {

    const { themeMode } = useTheme();

    const labelArray = salesData.map(item => item.category)
    const salesDataByCategory = salesData.map(item => item.totalSales)

    const data = {
        labels: labelArray,
        datasets: [{
            label: 'Sales',
            data: salesDataByCategory,
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: themeMode === 'dark' ? 'white' : 'black',
                }
            },
        }
    };

    return (
        <Doughnut data={data} options={options} />
    )
}

export default SalesByCategory