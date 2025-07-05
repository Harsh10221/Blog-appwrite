import config from "../config/config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {

    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            await this.databases.createDocument(
                config.databaseId,
                config.collectionId,
                slug, {
                title,
                content,
                featuredImage,
                status,
                userId,
            }

            )
        } catch (error) {

        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.databaseId,
                config.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.databaseId,
                config.collectionId,
                slug
            )
            return true;
        } catch (error) {
            throw error

        }
    }


    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.databaseId,
                config.collectionId,
                slug
            )
        } catch (error) {
            throw error
        }
    }


    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.databaseId,
                config.collectionId,
                queries,
            )
        } catch (error) {
            throw error

        }
    }


    async uploadFile(file) {
        try {
            await this.bucket.createFile(
                config.bucketId,
                ID.unique(),
                file
            )
            return true
        } catch (error) {
            throw error

        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                config.bucketId,
                fileId
            )
        } catch (error) {
            throw error

        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.bucketId,
            fileId
        )
    }


}




const service = new Service()
export default service