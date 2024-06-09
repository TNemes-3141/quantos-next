"use state";

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type ProbabilityDistributionChartProps = {
    probabilities: number[],
    barLabel: string,
}

export default function ProbabilityDistributionChart({ probabilities, barLabel }: ProbabilityDistributionChartProps) {
    const [primaryColor, setPrimaryColor] = useState<string>('');
    const [foregroundColor, setForegroundColor] = useState<string>('');

    const paddedProbabilities = [...probabilities, ...Array(5 - probabilities.length).fill(0)].slice(0, 5);

    useEffect(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        const primary = rootStyles.getPropertyValue('--primary').trim();
        const foreground = rootStyles.getPropertyValue('--foreground').trim();
        setPrimaryColor(primary);
        setForegroundColor(foreground);
    }, [probabilities]);

    const data = {
        labels: ['#1', '#2', '#3', '#4', '#5'],
        datasets: [
            {
                label: barLabel,
                data: paddedProbabilities.map(p => (p * 100).toFixed(1)),
                backgroundColor: [`hsl(${primaryColor})`, 'rgba(0,0,0,0)'],
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    color: [`hsl(${foregroundColor})`, 'rgba(0,0,0,0)'], // White color for ticks
                },
            },
            x: {
                ticks: {
                    color: [`hsl(${foregroundColor})`, 'rgba(0,0,0,0)'], // White color for ticks
                },
                grid: {
                    display: false,
                },
                categoryPercentage: 1.0,  // Ensure each category takes up the full width
                barPercentage: 1.0,  // Ensure each bar takes up the full width
            },
        },
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
        },
        maintainAspectRatio: false,
    };

    return <div className='h-[300px]'>
        <Bar data={data} options={options} />
    </div>;
}