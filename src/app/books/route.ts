import { createBook, findBook } from "../repositories/bookRepository";
import { Book } from "../database/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod"
import { fromZodError } from "zod-validation-error";

type ResponseData = {
    message: string;
    data?: any;
}

const createBookSchema = z.object({
  id:z.number(),
  title: z.string(),
  author: z.string(),
  isbn_10: z.string(),
  isbn_13: z.string(),
  publication_year: z.number(),
  genre: z.string(),
  pages: z.number(),
  cover_image: z.string(),

})


export default async function handler(req:NextApiRequest, res:NextApiResponse<ResponseData>) {
    if(req.method === "POST"){
        try {
            const parsed = createBookSchema.parse(req.body)
            const newBook = await createBook(parsed)

            if(newBook){
                return res.status(201).json({
                    message:"Book created successfully",
                    data: newBook
                })
            }
            else {
                return res.status(400).json({message:"Error, failed to create Book"})
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
            const Book = await findBook(req.query as Partial<Book>)
            return res.status(200).json({ message: "Successfully fetched users", data: Book });
        } catch (error) {
            return res.status(500).json({ message: "Error, unable to process user fetch request"
            })
            
        }
    }
   
    
}