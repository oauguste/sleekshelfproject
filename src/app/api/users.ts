import { createUser, findUser } from "../repositories/userRepository";
import { User, NewUser } from "../database/interfaces";
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

type ResponseData = {
  message: string;
  data?: any;
}

const createUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  premium_status: z.enum(["free", "paid"]),
  created_at: z.string().datetime(),
  passwordHash: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'POST') {
    try {
      const parsed = createUserSchema.parse(req.body);
      const newUser = await createUser(parsed);

      if (newUser) {
        return res.status(201).json({ message: "User created successfully", data: newUser });
      } else {
        return res.status(400).json({ message: "Error, failed to create user" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      } else {
        return res.status(500).json({ message: "Error, unable to process request" });
      }
    }
  } else if (req.method === "GET") {
    try {
      const users = await findUser(req.query as Partial<User>);
      return res.status(200).json({ message: "Successfully fetched users", data: users });
    } catch (error) {
      return res.status(500).json({ message: "Error, unable to process user fetch request" });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
