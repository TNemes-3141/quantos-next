import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log(data);

  if (error || !data?.user) {
    console.log("Error: " + error);
    redirect('/auth/login');
  }

  return <p>Welcome to your new account!</p>
}