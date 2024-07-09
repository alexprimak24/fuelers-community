import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export interface getPostProps {
  slug: string;
}

export interface createPostProps {
  title: string;
  slug: string;
  content: string;
  featuredImage?: string;
  status: string;
  userId: string;
}

export interface updatePostProps {
  title: string;
  slug: string;
  content: string;
  featuredImage?: string;
  status: string;
}

export interface uploadFileProps {
  file: File;
}
export interface FileIdProps {
  fileId: string;
}

export class Service {
  client: Client = new Client();
  databases: Databases;
  bucket: Storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async getPost({ slug }: getPostProps) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdAll,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost() ::", error);
      return false;
    }
  }
  // queries = [Query.equal("language", "EN")]
  async getPosts() {
    const limit = 100;
    let offset = 0;
    let allDocuments: any[] = [];
    let hasMore = true;

    try {
      while (hasMore) {
        const response = await this.databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionIdAll,
          [Query.limit(limit), Query.offset(offset)]
        );
        if (response.documents.length > 0) {
          allDocuments = allDocuments.concat(response.documents);
          offset += response.documents.length;
        } else {
          hasMore = false;
        }
      }
      return { documents: allDocuments };
    } catch (error) {
      console.log("Appwrite service :: getPosts() ::", error);
      return false;
    }
  }
  async getVoteCategories() {
    const limit = 100;
    let offset = 0;
    let allDocuments: any[] = [];
    let hasMore = true;

    try {
      while (hasMore) {
        const response = await this.databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionIdActivityMonth,
          [Query.limit(limit), Query.offset(offset)]
        );
        if (response.documents.length > 0) {
          allDocuments = allDocuments.concat(response.documents);
          offset += response.documents.length;
        } else {
          hasMore = false;
        }
      }
      return { documents: allDocuments };
    } catch (error) {
      console.log("Appwrite service :: getPosts() ::", error);
      return false;
    }
  }
  getFilePreview({ fileId }: FileIdProps) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).href;
  }
  getFilePreviewBestWorks({ fileId }: FileIdProps) {
    return this.bucket.getFilePreview(conf.appwriteBucketBest, fileId).href;
  }
}

const service = new Service();
export default service;
