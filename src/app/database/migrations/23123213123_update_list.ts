import { Kysely, sql } from "kysely";
export async function up(db: Kysely<any>): Promise<void> {
 

  await db.schema
    .createTable("list")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "integer", (col) =>
      col.references("user.id").onDelete("cascade").notNull(),
    )
    .addColumn("title", "varchar")
    .addColumn("description", "varchar")
    .addColumn("is_template", "boolean", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();
  await db.schema
    .createTable("book")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("title", "varchar", (col) => col.notNull())
    .addColumn("author", "varchar", (col) => col.notNull())
    .addColumn("isbn_10", "varchar")
    .addColumn("isbn_13", "varchar")
    .addColumn("publication_year", "integer")
    .addColumn("genre", "varchar")
    .addColumn("pages", "integer")
    .addColumn("cover_image", "varchar")
    .execute();

  await db.schema
    .createTable("list_book")
    .addColumn("list_id", "integer", (col) =>
      col.references("list.id").onDelete("cascade").notNull(),
    )
    .addColumn("book_id", "integer", (col) =>
      col.references("book.id").onDelete("cascade").notNull(),
    )
    .addColumn("user_ranking", "integer")
    .execute();

  await db.schema
    .createTable("tag")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("tag_name", "varchar", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("list_tag")
    .addColumn("list_id", "integer", (col) =>
      col.references("list.id").onDelete("cascade").notNull(),
    )
    .addColumn("tag_id", "integer", (col) =>
      col.references("tag.id").onDelete("cascade").notNull(),
    )
    .execute();

  await db.schema
    .createTable("comment")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("list_id", "integer", (col) =>
      col.references("list.id").onDelete("cascade").notNull(),
    )
    .addColumn("user_id", "integer", (col) =>
      col.references("user.id").onDelete("cascade").notNull(),
    )
    .addColumn("comment_text", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createTable("comment_rating")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("comment_id", "integer", (col) =>
      col.references("comment.id").onDelete("cascade").notNull(),
    )
    .addColumn("user_id", "integer", (col) =>
      col.references("user.id").onDelete("cascade").notNull(),
    )
    .addColumn("vote", "integer", (col) => col.notNull().defaultTo(0))
    .execute();

  await db.schema
    .createTable("list_rating")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("list_id", "integer", (col) =>
      col.references("list.id").onDelete("cascade").notNull(),
    )
    .addColumn("user_id", "integer", (col) =>
      col.references("user.id").onDelete("cascade").notNull(),
    )
    .addColumn("vote", "integer", (col) => col.notNull().defaultTo(0))
    .execute();
}
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("list_rating").execute();
  await db.schema.dropTable("comment_rating").execute();
  await db.schema.dropTable("comment").execute();
  await db.schema.dropTable("tag_list").execute();
  await db.schema.dropTable("tag").execute();
  await db.schema.dropTable("list_book").execute();
  await db.schema.dropTable("book").execute();
  await db.schema.dropTable("list").execute();
  await db.schema.dropTable("user").execute();
}
