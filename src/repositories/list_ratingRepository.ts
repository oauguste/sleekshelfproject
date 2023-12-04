import { db } from "../database/database";
import { ListRating, NewListRating, ListRatingUpdate } from "../database/interfaces";

export async function findListRatingById(id: number) {
  return await db
    .selectFrom("list_rating")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}
export async function findListRatings(criteria: Partial<ListRating>) {
    let query = db.selectFrom('list_rating');
  
    // Add other criteria as needed
    if (criteria.list_id) {
      query = query.where('list_id', '=', criteria.list_id);
    }
  
    if (criteria.user_id) {
      query = query.where('user_id', '=', criteria.user_id);
    }
    return await query.selectAll().execute();
  
}
export async function createListRating(listRating: NewListRating) {
  return await db
    .insertInto("list_rating")
    .values(listRating)
    .execute();
}

export async function updateListRating(id: number, updateWith: ListRatingUpdate) {
  await db.updateTable("list_rating").set(updateWith).where("id", "=", id).execute();
}

export async function deleteListRating(id: number) {
  return await db
    .deleteFrom("list_rating")
    .where("id", "=", id)
    .execute();
}