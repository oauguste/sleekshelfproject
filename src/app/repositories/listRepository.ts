import { db } from "../database/database";
import { List, NewList, ListUpdate } from "../database/interfaces";

export async function findListById(id: number) {
  return await db
    .selectFrom("list")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}
export async function findList(criteria: Partial<List>) {
  let query = db.selectFrom("list");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id);
  }

  if (criteria.title) {
    query = query.where("title", "=", criteria.title);
  }

  return await query.selectAll().execute();
}


export async function updateList(id: number, updateWith: ListUpdate) {
  await db.updateTable("list").set(updateWith).where("id", "=", id).execute();
}

export async function createList(list: NewList) {
  return await db
    .insertInto("list")
    .values(list)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function deleteList(id: number) {
  return await db
    .deleteFrom("list")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
