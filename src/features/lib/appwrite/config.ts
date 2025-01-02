import { Client, Storage } from "appwrite"

interface AppwriteConfig {
    projectId: string
    storageId: string
    url: string;
}

export const appwriteConfig: AppwriteConfig = {
    projectId: process.env.REACT_APP_APPWRITE_PROJECT_ID || "",
    storageId: process.env.REACT_APP_APPWRITE_STORAGE_ID || "",
    url: process.env.REACT_APP_APPWRITE_URL || "",
}
export const client = new Client()

client.setEndpoint(appwriteConfig.url)
client.setProject(appwriteConfig.projectId)

export const storage = new Storage(client)
