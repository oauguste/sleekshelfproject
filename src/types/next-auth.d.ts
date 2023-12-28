import type { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

type UserId = string

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId
    username?: string | null
     needsProfileCompletion?: boolean;
    
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: UserId
      username?: string | null
      name?: string | null
      email?: string | null
      needsProfileCompletion?: boolean | null
      
    }
    
  }
  interface Session extends NextAuthSession {
    user: User
  }
}