"use client";

import { useState, useEffect } from "react";

import ProbabilityDistributionChart from "./charts/ProbabilityDistributionChart";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "./shadcn-ui/card";
import { Slider } from "./shadcn-ui/slider";
import { Label } from "./shadcn-ui/label";

type ProbabilityDistributionDisplayProps = {
    energies: number[],
    probabilitySubheading: string,
    probabilitySliderLabel: string,
    probabilityDescription: string,
    percentFormat: string,
}

const boltzmannDistribution = (energies: number[], temperature: number): number[] => {
    if (temperature === 0) {
        const res = energies.map(e => 0);
        res[0] = 1;
        return res;
    }
    const factorized = energies.map(e => -e / temperature);
    const lse = logsumexp(factorized);
    return factorized.map(e => Math.exp(e - lse));
};

const logsumexp = (numbers: number[]): number => {
    const c = Math.max(...numbers);
    return c + Math.log(numbers.map(n => Math.exp(n - c)).reduce((a, b) => a + b));
};


export default function ProbabilityDistributionDisplay(props: ProbabilityDistributionDisplayProps) {
    const defaultTemperature = 16;
    const [temperature, setTemperature] = useState(defaultTemperature);
    const [probabilities, setProbabilities] = useState<number[]>([]);

    useEffect(() => {
        if (props.energies.length === 0) {
            return;
        }
        const tempKelvin = temperature / 100;
        const probs = boltzmannDistribution(props.energies, tempKelvin);
        setProbabilities(probs);    
    }, [temperature, props.energies])

    const getSliderLabel = () => {
        return props.probabilitySliderLabel.replace("{{ value }}", `${temperature}`);
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{props.probabilitySubheading}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center gap-4">
                    {props.energies.length !== 0 ? <>
                        <ProbabilityDistributionChart probabilities={probabilities}/>
                        <Slider
                            id="temp-slider"
                            onValueChange={(value) => setTemperature(value[0])}
                            defaultValue={[defaultTemperature]}
                            min={0}
                            max={500}
                            step={1}
                            className="w-[60%]"
                        />
                        <Label htmlFor="age-slider">
                            {getSliderLabel()}
                        </Label>
                    </> : null}
                    <p className="text-center">
                        {props.probabilityDescription.replace("{{ percentage }}",
                            props.percentFormat.replace("{{ value }}", ((probabilities[0] || 0) * 100).toFixed(1))
                        )}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}