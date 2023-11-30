import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
  GeneratedAlways
 
} from "kysely";

export interface Database {
  user: UserTable;
  list: ListTable;
  book: BooksTable;
  list_book: ListBookJunction;
  tag: TagsTable;
  list_tag: TagListJunction;
  comment: CommentsTable;
  comment_rating: CommentsRatingTable;
  list_rating: ListRatings;
    // Required tables for NextAuth.js
    User: {
      id: GeneratedAlways<string>;
      name: string | null;
      email: string;
      emailVerified: Date | null;
      image: string | null;
    };
    Account: {
      id: GeneratedAlways<string>;
      userId: string;
      type: string;
      provider: string;
      providerAccountId: string;
      refresh_token: string | null;
      access_token: string | null;
      expires_at: number | null;
      token_type: string | null;
      scope: string | null;
      id_token: string | null;
      session_state: string | null;
    };
    Session: {
      id: GeneratedAlways<string>;
      userId: string;
      sessionToken: string;
      expires: Date;
    };
    VerificationToken: {
      identifier: string;
      token: string;
      expires: Date;
    };
}

export interface UserTable {
  // Columns that are generated by the database should be marked
  // using the `Generated` type. This way they are automatically
  // made optional in inserts and updates.
  id: Generated<number>;
  username: string;
  email: string;
  passwordHash: string;
  premium_status: "free" | "paid";
  // If the column is nullable in the database, make its type nullable.
  // Don't use optional properties. Optionality is always determined
  // automatically by Kysely.

  // You can specify a different type for each operation (select, insert and
  // update) using the `ColumnType<SelectType, InsertType, UpdateType>`
  // wrapper. Here we define a column `created_at` that is selected as
  // a `Date`, can optionally be provided as a `string` in inserts and
  // can never be updated:
  created_at: ColumnType<Date, string | undefined, never>;
}

// You should not use the table schema interfaces directly. Instead, you should
// use the `Selectable`, `Insertable` and `Updateable` wrappers. These wrappers
// make sure that the correct types are used in each operation.
export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export interface ListTable {
  id: Generated<number>;
  user_id: number;
  title: string;
  description: string;
  is_template: boolean;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type List = Selectable<ListTable>;
export type NewList = Insertable<ListTable>;
export type ListUpdate = Updateable<ListTable>;


export interface BooksTable {
  id: Generated<number>;
  title: string;
  author: string;
  isbn_10: string;
  isbn_13: string;
  publication_year: number;
  genre: string;
  pages: number;
  cover_image: string;
}

export type Book = Selectable<BooksTable>;
export type NewBook = Insertable<BooksTable>;
export type BookUpdate = Updateable<BooksTable>;

export interface ListBookJunction {
  list_id: number;
  book_id: number;
  user_ranking: number;
}
export type ListBook = Selectable<ListBookJunction>;
export type NewListBook = Insertable<ListBookJunction>;
export type ListBookUpdate = Updateable<ListBookJunction>;

export interface TagsTable {
  id: Generated<number>;
  tag_name: string;
}
export type Tag = Selectable<TagsTable>;
export type NewTag = Insertable<TagsTable>;
export type TagUpdate = Updateable<TagsTable>;

export interface TagListJunction {
  list_id: number;
  tag_id: number;
}
export type ListTag = Selectable<TagListJunction>;
export type NewListTag = Insertable<TagListJunction>;
export type ListTagUpdate = Updateable<ListBookJunction>;

export interface CommentsTable {
  id: Generated<number>;
  list_id: number;
  user_id: number;
  comment_text: string;
  created_at: ColumnType<Date, string | undefined, never>;
}
export type Comment = Selectable<CommentsTable>;
export type NewComment = Insertable<CommentsTable>;
export type CommentUpdate = Updateable<CommentsTable>;

export interface CommentsRatingTable {
  id: Generated<number>;
  comment_id: number;
  user_id: number;
  vote: number;
}
export type CommentRating = Selectable<CommentsRatingTable>;
export type NewCommentRating = Insertable<CommentsRatingTable>;
export type CommentRatingUpdate = Updateable<CommentsRatingTable>;

export interface ListRatings {
  id: Generated<number>;
  list_id: number;
  user_id: number;
  vote: number;
}
export type ListRating = Selectable<ListRatings>;
export type NewListRating = Insertable<ListRatings>;
export type ListRatingUpdate = Updateable<ListRatings>;
