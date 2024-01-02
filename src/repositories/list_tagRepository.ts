import { db } from "../database/database";
import { ListTag, NewListTag, ListTagUpdate } from "../database/interfaces";

export async function findTagListById(listId: number, tagId: number) {
  return await db
    .selectFrom("list_tag")
    .where("list_id", "=", listId)
    .where("tag_id", "=", tagId)
    .selectAll()
    .executeTakeFirst();
}

export async function findTagLists(criteria: Partial<ListTag>) {
    let query = db.selectFrom('list_tag');
  
    // Add other criteria as needed
    if (criteria.list_id) {
      query = query.where('list_id', '=', criteria.list_id);
    }
  
    if (criteria.tag_id) {
      query = query.where('tag_id', '=', criteria.tag_id);
    }
    return await query.selectAll().execute();
}

export async function createTagList(tagList: NewListTag) {
  return await db
    .insertInto("list_tag")
    .values(tagList)
    .execute();
}

export async function deleteTagList(listId: number, tagId: number) {
  return await db
    .deleteFrom("list_tag")
    .where("list_id", "=", listId)
    .where("tag_id", "=", tagId)
    .execute();
}

