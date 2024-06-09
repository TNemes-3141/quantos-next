"use client";

import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { secondary_font } from '@/lib/fonts';
import { cn } from '@/lib/utils';


ChartJS.register(ArcElement, Tooltip, Legend);

interface TotalProgressChartProps {
    progress: number; // Progress should be a value between 0 and 100
    percentFormat: string,
}

export default function TotalProgressChart({ progress, percentFormat }: TotalProgressChartProps) {
    const [primaryColor, setPrimaryColor] = useState<string>('');

    useEffect(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        setPrimaryColor(rootStyles.getPropertyValue('--primary').trim());
      }, []);

    const data = {
        labels: ['Completed', 'Remaining'],
        datasets: [
            {
                data: [progress, 100 - progress],
                backgroundColor: [`hsl(${primaryColor})`, 'rgba(0,0,0,0)'], // Use the primary color for the progress and make the remaining section transparent
                borderColor: [`hsl(${primaryColor})`, 'rgba(0,0,0,0)'], // Optional: border for the remaining section
                hoverBackgroundColor: [`hsl(${primaryColor})`, 'rgba(0,0,0,0)'],
                cutout: '70%', // Creates the ring effect
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                enabled: false, // Disable tooltips
            },
            legend: {
                display: false, // Hide legend
            },
        },
        cutout: '70%', // Creates the ring effect
    };

    const getPercentageString = (value: number): string => {
        return percentFormat.replace("{{ value }}", `${value}`);
    }

    return (
        <div className="relative w-full h-full">
            <Doughnut data={data} options={options} />
            <div className="absolute inset-0 flex items-center justify-center">
                <span className={cn("text-4xl font-bold", secondary_font.className)}>
                    {getPercentageString(progress)}
                </span>
            </div>
        </div>
    );
};
