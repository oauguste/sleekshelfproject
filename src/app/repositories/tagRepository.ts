import { db } from "../database/database";
import { Tag, NewTag, TagUpdate } from "../database/interfaces";

export async function findTagById(id: number) {
  return await db
    .selectFrom("tag")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findTags(criteria: Partial<Tag>) {
  let query = db.selectFrom("tag");

  if (criteria.tag_name) {
    query = query.where("tag_name", "like", `%${criteria.tag_name}%`);
  }
  // Add more criteria as needed

  return await query.selectAll().execute();
}

export async function createTag(tag: NewTag) {
  return await db
    .insertInto("tag")
    .values(tag)
    .execute();
}

export async function updateTag(id: number, updateWith: TagUpdate) {
  await db.updateTable("tag").set(updateWith).where("id", "=", id).execute();
}

export async function deleteTag(id: number) {
  return await db
    .deleteFrom("tag")
    .where("id", "=", id)
    .execute();
}
