import { db } from "../database/database";
import { ListBook, NewListBook, ListBookUpdate } from "../database/interfaces";

export async function findListBookById(listId: number, bookId: number) {
  return await db
    .selectFrom("list_book")
    .where("list_id", "=", listId)
    .where("book_id", "=", bookId)
    .selectAll()
    .executeTakeFirst();
}

export async function createListBook(listBook: NewListBook) {
  return await db
    .insertInto("list_book")
    .values(listBook)
    .execute();
}

export async function deleteListBook(listId: number, bookId: number) {
  return await db
    .deleteFrom("list_book")
    .where("list_id", "=", listId)
    .where("book_id", "=", bookId)
    .execute();
}
