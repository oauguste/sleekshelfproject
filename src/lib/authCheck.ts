import { NextApiRequest } from "next";
import { getAuthSession } from "@/lib/auth"; // Adjust the import path as needed

export async function getUserFromSession(req: NextApiRequest) {
    const session = await getAuthSession();
    if (!session || !session.user.id) {
        // You can throw an error or return null based on your error handling strategy
        throw new Error("Unauthorized");
    }

    return {
        userId: parseInt(session.user.id, 10), // Assuming the user ID is a number
        username: session.user.username
        // You can add more user fields if necessary
    };
}