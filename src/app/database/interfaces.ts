import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  user: UserTable;
  list: ListTable;
  book: BooksTable;
  listBook: ListBookJunction;
  tag: TagsTable;
  listTag: TagListJunction;
  comment: CommentsTable;
  commentRating: CommentsRatingTable;
  listRating: ListRatings;
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
  userId: number;
  title: string;
  description: string;
  isTemplate: boolean;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type List = Selectable<ListTable>;
export type NewList = Insertable<ListTable>;
export type ListUpdate = Updateable<ListTable>;

export interface BooksTable {
  id: Generated<number>;
  title: string;
  author: string;
  isbn10: string;
  isbn13: string;
  publicationYear: number;
  genre: string;
  pages: number;
  coverImage: string;
}

export type Book = Selectable<BooksTable>;
export type NewBook = Insertable<BooksTable>;
export type BookUpdate = Updateable<BooksTable>;

export interface ListBookJunction {
  listId: number;
  bookId: number;
  userRanking: number;
}
export type ListBook = Selectable<ListBookJunction>;
export type NewListBook = Insertable<ListBookJunction>;
export type ListBookUpdate = Updateable<ListBookJunction>;

export interface TagsTable {
  id: Generated<number>;
  tagName: string;
}
export type Tag = Selectable<TagsTable>;
export type NewTag = Insertable<TagsTable>;
export type TagUpdate = Updateable<TagsTable>;

export interface TagListJunction {
  listId: number;
  tagId: number;
}
export type ListTag = Selectable<TagListJunction>;
export type NewListTag = Insertable<TagListJunction>;
export type ListTagUpdate = Updateable<ListBookJunction>;

export interface CommentsTable {
  id: Generated<number>;
  listId: number;
  userId: number;
  commentText: string;
  created_at: ColumnType<Date, string | undefined, never>;
}
export type Comment = Selectable<CommentsTable>;
export type NewComment = Insertable<CommentsTable>;
export type CommentUpdate = Updateable<CommentsTable>;

export interface CommentsRatingTable {
  id: Generated<number>;
  commentId: number;
  userId: number;
  vote: number;
}
export type CommentRating = Selectable<CommentsRatingTable>;
export type NewCommentRating = Insertable<CommentsRatingTable>;
export type CommentRatingUpdate = Updateable<CommentsRatingTable>;

export interface ListRatings {
  id: Generated<number>;
  listId: number;
  userId: number;
  vote: number;
}
export type ListRating = Selectable<ListRatings>;
export type NewListRating = Insertable<ListRatings>;
export type ListRatingUpdate = Updateable<ListRatings>;
