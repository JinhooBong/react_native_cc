import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

export const appwriteConfig = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.jsm.aora",
	projectId: "66f6da85001dd94aa469",
	databaseId: "66f6dc7c0016a58be2f2",
	userCollectionId: "66f6dc9400184de33585",
	videoCollectionId: "66f6dca6003ccc4a0546",
	storageId: "66f6dd6c002980386513"
}

const {
	endpoint, 
	platform,
	projectId, 
	databaseId,
	userCollectionId, 
	videoCollectionId, 
	storageId
} = appwriteConfig;

// Init your react-native SDK
const client = new Client();

client
	.setEndpoint(appwriteConfig.endpoint) // Your endpoint
	.setProject(appwriteConfig.projectId) // your project id
	.setPlatform(appwriteConfig.platform) // your applicaiton id or bundle id
;

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
	try {
		const newAccount = await account.create(
			ID.unique(), 
			email,
			password, 
			username
		)

		if (!newAccount) throw Error;

		const avatarURL = avatars.getInitials(username);

		await signIn(email, password);

		const newUser = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			ID.unique(),
			{ 
				accountId: newAccount.$id,
				email: email, 
				username: username, 
				avatar: avatarURL
			}
		)

		return newUser;

	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
}



export const signIn = async (email, password) => {
	try {

		const session = await account.createEmailSession(email, password);

		return session;

	} catch (error) {
		throw new Error(error);
	}
}

export const getCurrentUser = async() => {
	try {
		const currentAccount = await account.get();

		if (!currentAccount) throw Error;

		const currentUser = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			[Query.equal('accountId', currentAccount.$id)]

		)

		if (!currentUser) throw Error;

		return currentUser.documents[0];
	} catch (error) {
		console.error(error);
	}
}

export const getAllPosts = async() => {
	try {
		const posts = await databases.listDocuments(
			databaseId,
			videoCollectionId
		)

		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
}

export const getLatestPosts = async () => {
	try {
		const posts = await databases.listDocuments(
			databaseId,
			videoCollectionId,
			[Query.orderDesc('$createdAt', Query.limit(7))]
		)
	} catch (error) {
		throw new Error(error);
	}
}