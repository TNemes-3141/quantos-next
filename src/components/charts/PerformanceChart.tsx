"use client";

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';


ChartJS.register(LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale);

interface Weekdays {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
}

interface LineChartProps {
    data: number[];
    dataPointLabel: string,
    weekdays: Weekdays;
}

export default function PerformanceChart({ data, dataPointLabel, weekdays }: LineChartProps) {
    const [primaryColor, setPrimaryColor] = useState<string>('');
    const [foregroundColor, setForegroundColor] = useState<string>('');
    const [labels, setLabels] = useState<string[]>([]);
    const { theme } = useTheme();

    useEffect(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        const primary = rootStyles.getPropertyValue('--primary').trim();
        const foreground = rootStyles.getPropertyValue('--foreground').trim();
        setPrimaryColor(primary);
        setForegroundColor(foreground);
        
        const generateLabels = () => {
            const today = new Date();
            const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
            const weekDayNames = [
                weekdays.sunday,
                weekdays.monday,
                weekdays.tuesday,
                weekdays.wednesday,
                weekdays.thursday,
                weekdays.friday,
                weekdays.saturday,
            ];
            const labels = [];
            for (let i = 0; i < 7; i++) {
                labels.push(weekDayNames[(dayOfWeek - 6 + i + 7) % 7]);
            }

            return labels;
        };

        setLabels(generateLabels());
    }, [weekdays]);

    const chartData = {
        labels,
        datasets: [
            {
                label: dataPointLabel,
                data,
                borderColor: [`hsl(${primaryColor})`, 'rgba(0,0,0,0)'],
                pointBackgroundColor: [`hsl(${primaryColor})`, 'rgba(0,0,0,0)'],
                fill: false,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: [`hsl(${foregroundColor})`, 'rgba(0,0,0,0)'],
                    maxRotation: 0,
                    autoSkip: false, // Ensure no ticks are skipped
                },
            },
            y: {
                ticks: {
                    color: [`hsl(${foregroundColor})`, 'rgba(0,0,0,0)'],
                    includeBounds: true, 
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
}