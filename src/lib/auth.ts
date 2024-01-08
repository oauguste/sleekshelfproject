// [...nextauth].ts
import {nanoid} from "nanoid"
import GoogleProvider from "next-auth/providers/google";
import { KyselyAdapter } from "@auth/kysely-adapter";
import { db } from "@/database/database";  // Adjust the path as necessary
import { NextAuthOptions, getServerSession } from "next-auth";
import {  findUser, updateUser } from "../repositories/userRepository";

export const authOptions: NextAuthOptions = {
   //@ts-ignore
  adapter: KyselyAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    
   
    async jwt({ token, user, trigger, session}) {

      if (!token.id) {
        token.id = nanoid();
      }
      // Check if the user exists when a new user is signing in
      if (user && typeof user.email === 'string') {
        const existingUser = await findUser({ email: user.email });
        token.needsProfileCompletion = !existingUser; // false if user exists
        if (existingUser) {
          token.id = existingUser.id.toString();
          token.username = existingUser.username || null;
        }
      }
     // Update token based on session changes
  if (trigger === "update" && session?.needsProfileCompletion !== undefined) {
    token.needsProfileCompletion = session.needsProfileCompletion;
  }

      return token;
    },  
    
    async session({token, session})
    {
    
      if (token){
        session.user.id = token.id || nanoid()
        session.user.name = token.name
        session.user.email = token.email || ''
        session.user.image = token.picture
        session.user.username = token.username
        // session.user.needsProfileCompletion = true;
        session.user.needsProfileCompletion = token.needsProfileCompletion;

    //     if(user){ 
    //       if (typeof user.email === 'string') { 
    //         console.log(user)
    //       const existingUser = await findUser({ email:  session.user.email });
    //       if (existingUser) {
    //         session.user.needsProfileCompletion = false;
    //         console.log(session.user.needsProfileCompletion)
            
        
        
    //     }
    //   }
    // }
       
      }
      return session
      
    },  }

  }
  export const getAuthSession = () => getServerSession(authOptions)

  // async signIn({user, account}) {
  //   if(account?.provider === "google"){
  //     if (typeof user.email === 'string') {
  //       const existingUser = await findUser({ email: user.email });
  //       console.log(existingUser)
  //       console.log(existingUser?.email)

  //       const needsProfileCompletion = !existingUser
        
  //       // if (!existingUser) {
  //       //   // Set the flag for profile completion
  //       //   (user as any).needsProfileCompletion = true;
  //       // } else {
  //       //   (user as any).needsProfileCompletion = false;
  //       // }
  //     }
  //     return true;
  //   }
  //   return true;
  // },