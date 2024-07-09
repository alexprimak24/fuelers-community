const conf = {
  appwriteUrl: process.env.REACT_APP_APPWRITE_URL as string,
  appwriteProjectId: process.env.REACT_APP_APPWRITE_PROJECT_ID as string,
  appwriteDatabaseId: process.env.REACT_APP_APPWRITE_DATABASE_ID as string,
  appwriteCollectionIdAll: process.env
    .REACT_APP_APPWRITE_COLLECTION_ALL_WORKS_ID as string,
  appwriteCollectionIdVoters: process.env
    .REACT_APP_APPWRITE_COLLECTION_VOTERS as string,
  appwriteCollectionIdActivityMonth: process.env
    .REACT_APP_APPWRITE_COLLECTION_BEST_ACTIVITY_MONTH as string,
  appwriteBucketId: process.env.REACT_APP_APPWRITE_BUCKET_ID as string,
  appwriteBucketBest: process.env.REACT_APP_APPWRITE_BUCKET_ID_BEST as string,
};

export default conf;
