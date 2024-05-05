import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log(data);

  if (error || !data?.user) {
    console.log("Error: " + error);
    redirect('/signup') //TODO: Replace with Login route
  }

  return <p>Hello {data.user.email}</p>
}