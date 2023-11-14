import { db } from "../database/database";
import { Book, NewBook, BookUpdate } from "../database/interfaces";

export async function findBookById(id: number) {
  return await db
    .selectFrom("book")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findBooks(criteria: Partial<Book>) {
  let query = db.selectFrom("book");

  if (criteria.title) {
    query = query.where("title", "like", `%${criteria.title}%`);
  }
  if (criteria.author) {
    query = query.where("author", "like", `%${criteria.author}%`);
  }
  if (criteria.isbn_10) {
    query = query.where("isbn_10", "like", `%${criteria.isbn_10}%`);
  }
  if (criteria.isbn_13) {
    query = query.where("isbn_13", "like", `%${criteria.isbn_13}%`);
  }
  if (criteria.genre) {
    query = query.where("genre", "like", `%${criteria.genre}%`);
  }
  // Add more criteria as needed

  return await query.selectAll().execute();
}

export async function updateBook(id: number, updateWith: BookUpdate) {
  await db.updateTable("book").set(updateWith).where("id", "=", id).execute();
}

export async function createBook(book: NewBook) {
  return await db
    .insertInto("book")
    .values(book)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function deleteBook(id: number) {
  return await db
    .deleteFrom("book")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
