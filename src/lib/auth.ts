// [...nextauth].ts

import GoogleProvider from "next-auth/providers/google";
import { KyselyAdapter } from "@auth/kysely-adapter";
import { db } from "@/app/database/database";  // Adjust the path as necessary
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  //@ts-ignore
  adapter: KyselyAdapter(db),

  pages: {
    signIn: '/sign-in',
  },
  }
