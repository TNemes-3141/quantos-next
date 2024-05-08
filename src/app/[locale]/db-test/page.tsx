"use client";

import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/shadcn-ui/button";

export default function Home() {
    const post = async () => {
        const supabase = createClient();

        const { data, error } = await supabase.rpc('generate_random_code', { team_name: "Fraunhofer TTO", expiry: 60, num_codes: 5 });
        console.log(data);
    }

    return (
        <Button onClick={post}>Senden</Button>
    );
}