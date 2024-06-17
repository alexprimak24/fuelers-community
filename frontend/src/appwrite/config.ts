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
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdAll
        // queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts() ::", error);
      return false;
    }
  }

  getFilePreview({ fileId }: FileIdProps) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).href;
  }
}

const service = new Service();
export default service;
