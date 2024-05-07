"use client";

import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/shadcn-ui/button";

export default function Home() {
    const post = async () => {
        const supabase = createClient();

        const { data, error } = await supabase.rpc('generate_random_code');
        console.log(data);
    }

    return (
        <Button onClick={post}>Senden</Button>
    );
}