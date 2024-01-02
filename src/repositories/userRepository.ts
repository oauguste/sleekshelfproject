import { db } from "../database/database";
import { User, NewUser, UserUpdate } from "../database/interfaces";

export async function findUserById(id:number) {
    return await db
    .selectFrom('user')
    .where('id',"=", id)
    .selectAll()
    .executeTakeFirst()
    
}

export async function findUser(criteria:Partial<User>) {
    let query = db.selectFrom('user');

    if(criteria.id){
        query = query.where('id', '=', criteria.id)
    }
    if(criteria.email){
        query = query.where('email', '=', criteria.email)
    }
    if(criteria.username){
        query = query.where('username', '=', criteria.username)
    }
    return await query.selectAll().executeTakeFirst()
    
}

export async function updateUser(id: number, updateWith:UserUpdate) {
    await db.updateTable('user').set(updateWith).where('id', '=', id).execute()
    
}
export async function updateUserEmail(email: string, updateWith: UserUpdate) {
    await db.updateTable('user')
        .set(updateWith)
        .where('email', '=', email)
        .execute();
}

export async function createUser(user:NewUser) {
    return await db.insertInto(
        "user"
    ).values(user)
    .returningAll()
    .executeTakeFirstOrThrow()
    
}


export async function deleteUser(id:number) {
    return await db.deleteFrom('user')
    .where("id", '=', id)
    .returningAll()
    .executeTakeFirst()
    
}