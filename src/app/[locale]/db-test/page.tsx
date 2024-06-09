"use client";

import { createClient } from "@/lib/supabase/client";
import { postOutline } from "./actions";
import axios from 'axios';

import { Button } from "@/components/shadcn-ui/button";


export default function Home() {
    /*const post = async () => {
        const supabase = createClient();

        const { data, error } = await supabase.rpc('generate_random_code', { team_name: "Fraunhofer TTO", expiry: 60, num_codes: 5 });
        console.log(data);
    }*/

    /*const post = async () => {
        postOutline();
        console.log("Done!");
    }*/

    const post = async () => {
        try {
            const hamiltonian = [[-1, 0, 3],[0, -1, 0],[0, 0, -1]];
            console.log(hamiltonian);
            const token = "DEV-26e55bfa2c93e9c1b22c85a124c9cf10d7b47a5a";
            const response = await axios.post('/api/solve-hamiltonian', { hamiltonian, token });
            console.log(response.data.solutions);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Button onClick={post}>Senden</Button>
    );
}