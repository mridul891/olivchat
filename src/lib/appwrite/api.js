import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases } from './config'

///This file is basically used  to call all  the  appwrite services in order to ease in the programming process
export async function createUserAccount(user) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );
        if (!newAccount) throw new Error("Account creation failed");

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        });
        return newUser;
    }catch (error) {
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )
        return newUser
    } catch (error) {
        console.log(error)
    }
}

export async function signInAccount(user) {
    try {
        const session = await account.createEmailSession(user.email, user.password);
        return session;
    } catch (error) {
        console.log(error);
        return error;
    }
} 

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw new Error("Account not found");

        const  currentUser  = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal ('accountId',currentAccount.$id)]
        )

        if (!currentUser) throw new Error("User not found");
        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
}