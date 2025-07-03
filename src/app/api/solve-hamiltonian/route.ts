import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { hamiltonian, label } = body;

        if (!hamiltonian || !label) {
            return NextResponse.json({ error: 'Missing hamiltonian or label' }, { status: 400 });
        }

        const API_TOKEN = process.env.QUBO_EMBEDDER_API_TOKEN;
        if (!API_TOKEN) {
            return NextResponse.json({ error: 'API token not configured on server' }, { status: 500 });
        }

        const response = await axios.post(
            'https://api.quantoslabs.com/solve_hamiltonian',
            { hamiltonian, label },
            {
                headers: {
                    Authorization: API_TOKEN,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Convert the solutions to SolutionRecordEntry format
        const solutions = response.data.solutions.map((solution: any) => ({
            sample: solution.sample,
            energy: solution.energy,
            num_occurrences: solution.num_occurrences,
        }));

        return NextResponse.json({ solutions }, { status: 200 });

    } catch (error) {
        console.error('Error calling FastAPI backend:', error);
        return NextResponse.json({ error: 'Error calling FastAPI backend' }, { status: 500 });
    }
}
