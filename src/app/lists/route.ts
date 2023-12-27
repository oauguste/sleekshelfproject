import { createList, findList } from "../../repositories/listRepository";
import { List } from "../../database/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod"
import { fromZodError } from "zod-validation-error";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth";
import { getUserFromSession } from "@/lib/authCheck"; // Adjust the import path as needed


type Response = {
    message: string;
    data?: any;
}

const createListSchema = z.object({
    id:z.string(),
    user_id: z.number(),
    title: z.string(),
    description: z.string(),
    is_template: z.boolean(),
    created_at: z.string().datetime(),

})
export type CreateListSchema = z.infer<typeof createListSchema>
export const dynamic = 'auto';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || isNaN(Number(session?.user.id))) {
          console.log(session?.user.id)
          return Response.json({ message: "Invalid user ID"});
        }
        
        const userId = Number(session.user.id);
      const body = await request.json();
      const { title, description } = body;
    
      const newList = await createList({
        user_id: userId,
        title,
        description,
        is_template: false,
        created_at: new Date().toISOString()
      });
 
      if (newList) {
        return Response.json({ message: "List created successfully", data: newList });
      } else {
        return Response.json({ message: "Error, failed to create list" });
      }
        } catch (error) {
            if(error instanceof z.ZodError){
                const validationError = fromZodError(error)
                return Response.json({message: validationError.message})
            }else{
              console.error(error);
              
                return Response.json({message: "Error, unable to  process this request"})
            }
            
        }
    }
    export async function GET(request: Request) {
        try {
          const list = await findList(request.url as unknown as Partial<List>);
          return Response.json({ message: "Successfully fetched lists", data: list });
        } catch (error) {
          return Response.json({ message: "Error, unable to process lists fetch request", });
        }
      }
   
    
