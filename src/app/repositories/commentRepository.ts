import { db } from "../database/database";
import { Comment, NewComment, CommentUpdate } from "../database/interfaces";

export async function findCommentById(id: number) {
  return await db
    .selectFrom("comment")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findComments(criteria: Partial<Comment>) {
  let query = db.selectFrom("comment");

  if (criteria.list_id) {
    query = query.where("list_id", "=", criteria.list_id);
  }
  if (criteria.user_id) {
    query = query.where("user_id", "=", criteria.user_id);
  }
  // Add more criteria as needed

  return await query.selectAll().execute();
}

export async function createComment(comment: NewComment) {
  return await db
    .insertInto("comment")
    .values(comment)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function updateComment(id: number, updateWith: CommentUpdate) {
  await db.updateTable("comment").set(updateWith).where("id", "=", id).execute();
}

export async function deleteComment(id: number) {
  return await db
    .deleteFrom("comment")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
