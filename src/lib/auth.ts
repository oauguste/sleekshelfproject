import { db } from "@/app/database/database";
import { KyselyAdapter } from "@auth/kysely-adapter"
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
export const authOptions:NextAuthOptions = {
     adapter: KyselyAdapter(db),
     session:{strategy:"jwt"},
     pages:{
        signIn: '/sign-in'
     },
     providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
      ],
     
}