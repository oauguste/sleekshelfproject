// useProfileCompletion.ts (custom hook)

import * as React from "react"
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

 const useProfileCompletion = (): void => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.needsProfileCompletion) {
      router.push('/complete-profile');
    }
  }, [session, router]);
}

export {useProfileCompletion}
