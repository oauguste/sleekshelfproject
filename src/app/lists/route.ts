import { createList, findList } from "../../repositories/listRepository";
import { List } from "../../database/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod"
import { fromZodError } from "zod-validation-error";

type ResponseData = {
    message: string;
    data?: any;
}

const createListSchema = z.object({
    id:z.number(),
    user_id: z.number(),
    title: z.string(),
    description: z.string(),
    is_template: z.boolean(),
    created_at: z.string().datetime(),

})


export default async function handler(req:NextApiRequest, res:NextApiResponse<ResponseData>) {
    if(req.method === "POST"){
        try {
            const parsed = createListSchema.parse(req.body)
            const newList = await createList(parsed)

            if(newList){
                return res.status(201).json({
                    message:"List created successfully",
                    data: newList
                })
            }
            else {
                return res.status(400).json({message:"Error, failed to create list"})
            }
        } catch (error) {
            if(error instanceof z.ZodError){
                const validationError = fromZodError(error)
                return res.status(400).json({message: validationError.message})
            }else{
                return res.status(500).json({message: "Error, unable to process request"})
            }
            
        }
    }
    if(req.method ==="GET"){
        try {
            const list = await findList(req.query as Partial<List>)
            return res.status(200).json({ message: "Successfully fetched users", data: list });
        } catch (error) {
            return res.status(500).json({ message: "Error, unable to process user fetch request"
            })
            
        }
    }
   
    
}