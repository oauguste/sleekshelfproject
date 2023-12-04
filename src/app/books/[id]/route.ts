import { BookUpdate } from '@/app/database/interfaces';
import { deleteBook, findBookById, updateBook } from '@/repositories/bookRepository';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';


type ResponseData = {
    message: string;
    data?: any;
}
const updateBookSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query; 
    const bookId = parseInt(id as string);

    if(req.method === "PUT"){
    
    
    try {
        // const BookId = parseInt(req.query.id as string); might not work

        if(isNaN(bookId)){
            return res.status(400).json({ message: "Invalid Book ID" });
        }
      const existingBook = await findBookById(bookId)

      if(!existingBook){
        return res.status(404).json({message:"Book not found"})
      }
      const parsedUpdateData = updateBookSchema.parse(req.body)
      const updatedBook = await updateBook(bookId, parsedUpdateData as BookUpdate)
      return res.status(200).json({
         message: "Book updated sucessfully",
         data:updatedBook
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
            if(isNaN(bookId)){
            return res.status(400).json({message: "InvaBook Book ID"})
        }
            const existingBook = await findBookById(bookId)

            if(!existingBook ){
            return res.status(404).json({message: "Book not found"})
    }
    
            await deleteBook(bookId)
            return res.status(200).json({ message: "Book deleted successfully" });
}       catch(error){
            return res.status(500).json({ message: "Error, unable to process delete request" });
    }
        }
}