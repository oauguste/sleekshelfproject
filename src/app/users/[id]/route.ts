import { UserUpdate } from '@/app/database/interfaces';
import { deleteUser, findUserById, updateUser } from '@/app/repositories/userRepository';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';


type ResponseData = {
    message: string;
    data?: any;
}
const updateUserSchema = z.object({
  email: z.string(),
  passwordHash: z.string(),
  premium_status: z.enum(["free", "paid"]),
    
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query; 
    const userId = parseInt(id as string);

    if(req.method === "PUT"){
    
    
    try {
        // const UserId = parseInt(req.query.id as string); might not work

        if(isNaN(userId)){
            return res.status(400).json({ message: "Invalid User ID" });
        }
      const existingUser = await findUserById(userId)

      if(!existingUser){
        return res.status(404).json({message:"User not found"})
      }
      const parsedUpdateData = updateUserSchema.parse(req.body)
      const updatedUser = await updateUser(userId, parsedUpdateData as UserUpdate)
      return res.status(200).json({
         message: "User updated sucessfully",
         data:updatedUser
})
        
    } catch (error) {
        if(error instanceof z.ZodError){
            const validationError = fromZodError(error)
            return res.status(400).json({message: validationError.message})
        }
        else {
            return res.status(500).json({ message: "Error, unable to process request" });
        }
    }
}
    if(req.method === "DELETE"){
        try{
            if(isNaN(userId)){
            return res.status(400).json({message: "InvaUser User ID"})
        }
            const existingUser = await findUserById(userId)

            if(!existingUser ){
            return res.status(404).json({message: "User not found"})
    }
    
            await deleteUser(userId)
            return res.status(200).json({ message: "User deleted successfully" });
}       catch(error){
            return res.status(500).json({ message: "Error, unable to process delete request" });
    }
        }
}