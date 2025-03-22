import React, { useEffect, useState } from 'react'
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
// function getLastSixMonths() {

//     const months = [];
//     const date = new Date();

//     for (let i = 5; i >= 0; i--) {
//         const tempDate = new Date(date);
//         tempDate.setMonth(date.getMonth() - i);
//         const monthName = tempDate.toLocaleString('default', { month: 'short' });
//         months.unshift(monthName);

//     }
//     return months;
// }

function SalesGraph({ sixMonthSalesData }) {

    const { themeMode } = useTheme();
    const [salesData, setSalesData] = useState([])
    const [labels, setLabels] = useState([])

    function getLastSixMonths() {

        const months = [];
        const date = new Date();

        const data = [];
        let dataLength = sixMonthSalesData.length

        for (let i = 5; i >= 0; i--) {
            const tempDate = new Date(date);
            tempDate.setMonth(date.getMonth() - i);
            const monthName = tempDate.toLocaleString('default', { month: 'short' });
            months.unshift(monthName);

            let isFound = false

            for (let index = 0; index < sixMonthSalesData.length; index++) {
                if(sixMonthSalesData[index].month == monthName){
                    data.unshift(sixMonthSalesData[index].totalSales)
                    isFound = true
                }
            }
            if(!isFound) data.unshift(0)
        }
        setLabels(months)
        setSalesData(data)
    }

    useEffect(() => {
        getLastSixMonths()
    }, [])

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'My Dataset', // Label for the line
                data: salesData, // Data points for the line
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

export default SalesGraph