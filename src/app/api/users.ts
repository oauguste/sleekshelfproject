import { createUser, findUserByid, findUser, updateUser, deleteUser } from "../repositories/userRepository";
import { User, NewUser } from "../database/interfaces";
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const myError = new z.ZodError([]);
const passwordForm = z
  .object({
    password: z.string(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });

passwordForm.parse({ password: "asdf", confirm: "qwer" });
type ResponseData = {
    message: string
  }
  const createUserSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    premium_status: z.enum(["free", "paid"]),
    created_at: z.string().datetime(),
    passwordHash: z.string(),
   
  });

export default async function handler(req:NextApiRequest ,res:NextApiResponse<ResponseData>) {
    if(req.method === 'POST'){
        try {
            // const parsed = createUserSchema.parse(JSON.parse(req.body))
            const parsed = createUserSchema.parse(req.body)
            // const userData:NewUser = JSON.parse(req.body)
            const newUser = await createUser(parsed)
            if(newUser){
                res.status(201).json({message:"user created successfully"})
            }
            res.status(201).json({message:"Error, failed to create user"})
            
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Convert Zod error to a more user-friendly format
                const validationError = fromZodError(error);
                res.status(400).json({ message: validationError.message});
              }
            else {res.status(500).json({message:"Error, unable to proccess request"})}
         
            
        }
    }
    else if(req.method === "GET"){
        try {
            const users = await findUser(req.query as Partial<User>)
            res.status(200).json({message:"successfully fetch user"})
            
        } catch (error) {
            res.status(500).json({message:"Error, unable to proccess user fetch request"})
            
        }
    }
    else{
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    
}