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
    
    async session({token, session})
    {
    
      if (token){
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.username = token.username
        session.user.needsProfileCompletion = token.needsProfileCompletion ;
        // session.user.needsProfileCompletion = token.needsProfileCompletion ?? false;
      }
      return session
      
    },  
    async jwt({ token, user }) {
      if (user) {
        if (typeof user.email === 'string') { 
          const existingUser = await findUser({ email: user.email });
        // Set the flag on the token based on whether the user exists
        token.needsProfileCompletion = !existingUser;
        
      }
       

        // Check if user.email is not null or undefined before passing it to findUser
        if (user.email) {
          const dbUser = await findUser({ email: user.email });
    
          if (dbUser) {
            // Convert dbUser.id to string if it's a number, and assign it to token.id
            token.id = dbUser.id.toString();
    
            if (!dbUser.username) {
              // Generate and update username if it doesn't exist
              await updateUser(dbUser.id, { username: nanoid(10) });
            }
    
            // Update token with username
            token.username = dbUser.username || null;
          }
        }
    
        return token;
      } else if (token.email) {
        // When user object is not present, but token.email is
        const dbUser = await findUser({ email: token.email });
    
        if (dbUser) {
          // Convert dbUser.id to string, and update token with username
          token.id = dbUser.id.toString();
          token.username = dbUser.username || null;
        }
    
        return token;
      }
    
      // Return the token as is in other cases
      return token;
    },
    
    redirect(){
      return '/'
    }
  },

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