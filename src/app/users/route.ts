import { createUser, findUser } from "../../repositories/userRepository";
import { User } from "../../database/interfaces";
import { z } from "zod"
import { fromZodError } from "zod-validation-error";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth";
import { getUserFromSession } from "@/lib/authCheck"; // Adjust the import path as needed

const createUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  premium_status: z.enum(["free", "paid"]),
  created_at: z.string().datetime(),
  password_hash: z.string(),
});

export const dynamic = 'auto';
export type CreateUserSchema = z.infer<typeof createUserSchema>



export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !(session?.user.id)){
          console.log(session?.user.id)
          console.log(session?.user.name)
          console.log(session?.user.username)
          console.log(session?.user.id)
          return Response.json({ message: "Invalid user ID"});
        }

        const body = await request.json();
        const parsed = createUserSchema.parse(body);
        const newUser = await createUser(parsed);

        if (newUser) {
          return Response.json({ message: "User created successfully", data: newUser });
        } else {
          return Response.json({ message: "Error, failed to create user" });
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            const validationError = fromZodError(error);
            return Response.json({ message: validationError.message });
        } else {
            console.error(error);
            return Response.json({ message: "Error, unable to process request", error:error });
        }
    }
}

export async function GET(request: Request) {
    try {
        const users = await findUser(request.url as unknown as Partial<User>);
        return Response.json({ message: "Successfully fetched users", data: users });
    } catch (error) {
        return Response.json({ message: "Error, unable to process user fetch request" });
    }
}
