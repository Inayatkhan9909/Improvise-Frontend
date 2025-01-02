import { appwriteConfig, storage } from "./config"
import { ID, ImageGravity } from "appwrite"


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
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            ImageGravity.Top,
            100
        )
        if (!fileUrl) throw Error

        return fileUrl
    } catch (error) {
        console.log(error);
    }

}