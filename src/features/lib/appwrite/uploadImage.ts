import { appwriteConfig, storage } from "./config"
import { ID } from "appwrite"


export async function uploadFile(file: File) {

    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        )
        return uploadedFile

    } catch (error) {
        console.log(error)
    }

}

export function getFilePreview(fileId: any) {
    try {
        const fileUrl = storage.getFileView(
            appwriteConfig.storageId,
            fileId
        )
        if (!fileUrl) throw Error

        return fileUrl
    } catch (error) {
        console.log(error);
    }

}