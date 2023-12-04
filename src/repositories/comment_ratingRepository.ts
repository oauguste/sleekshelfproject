import { db } from "../database/database";
import { CommentRating, NewCommentRating, CommentRatingUpdate } from "../database/interfaces";

export async function findCommentRatingById(id: number) {
  return await db
    .selectFrom("comment_rating")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findCommentRatings(criteria: Partial<CommentRating>) {
    let query = db.selectFrom('comment_rating');
  
    // Extend with other criteria as needed
    if (criteria.comment_id) {
      query = query.where('comment_id', '=', criteria.comment_id);
    }
  
    if (criteria.user_id) {
      query = query.where('user_id', '=', criteria.user_id);
    }
  
    // More criteria...
  
    return await query.selectAll().execute();
  }

export async function createCommentRating(commentRating: NewCommentRating) {
  return await db
    .insertInto("comment_rating")
    .values(commentRating)
    .execute();
}

export async function updateCommentRating(id: number, updateWith: CommentRatingUpdate) {
  await db.updateTable("comment_rating").set(updateWith).where("id", "=", id).execute();
}

export async function deleteCommentRating(id: number) {
  return await db
    .deleteFrom("comment_rating")
    .where("id", "=", id)
    .execute();
}
