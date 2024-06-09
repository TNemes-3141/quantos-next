import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
    try {
        const { hamiltonian, token } = await req.json();

        console.log(hamiltonian);
        console.log(token);

        // Call the FastAPI backend
        const response = await axios.post('https://qubo-embedder-api-35541e21b105.herokuapp.com/solve_hamiltonian', {
            hamiltonian,
            token,
            region: 'eu-central-1',
            solver: 'Advantage_system5.4'
        });

        // Convert the solutions to SolutionRecordEntry format
        const solutions = response.data.solutions.map((solution: any) => ({
            sample: solution.sample,
            energy: solution.energy,
            num_occurrences: solution.num_occurrences
        }));

        // Return the results
        return NextResponse.json({ solutions });
    } catch (error) {
        console.error('Error calling FastAPI backend:', error);
        return NextResponse.json({ error: 'Error calling FastAPI backend' }, { status: 500 });
    }
}
