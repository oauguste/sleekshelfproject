import { ListUpdate } from '@/app/database/interfaces';
import { findListById, updateList } from '@/app/repositories/listRepository';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

type ResponseData = {
    message: string;
    data?: any;
}
const updateListSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    
})
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query; 
    const listId = parseInt(id as string);
    
    try {
        const listId = parseInt(req.query.id as string);

        if(isNaN(listId)){
            return res.status(400).json({ message: "Invalid list ID" });
        }
      const existingList = await findListById(listId)

      if(!existingList){
        return res.status(404).json({message:"List not found"})
      }
      const parsedUpdateData = updateListSchema.parse(req.body)
      const updatedList = await updateList(listId, parsedUpdateData as ListUpdate)
      return res.status(200).json({
         message: "List updated sucessfully",
         data:updatedList
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