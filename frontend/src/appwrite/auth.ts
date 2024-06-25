import conf from "../conf/conf";
import { Client, Account, ID, OAuthProvider, Databases, Query } from "appwrite";

export interface createAccountProps {
  email: string;
  password: string;
  name: string;
}

export interface loginProps {
  email: string;
  password: string;
}

interface checkAndAddUserProps {
  username: string;
}
interface createUserProps {
  username: string;
}

export class AuthService {
  client = new Client();
  databases: Databases;
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.account = new Account(this.client);
  }
  //handle Discord login with OAuth2
  async handleLogin() {
    try {
      localStorage.setItem("shouldScrollToVotingSection", "true");
      const response = await this.account.createOAuth2Session(
        OAuthProvider.Discord,
        "http://localhost:3000/",
        "http://localhost:3000/"
      );
      return response;
    } catch (error) {
      console.log("Appwrite service :: handleLogin() ::", error);
    }
  }
  //get current active user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser() ::", error);
    }
    return null;
  }
  async checkAndAddUser({ username }: checkAndAddUserProps) {
    if (username) {
      try {
        //check if the user exist
        const response = await this.databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionIdVoters,
          [Query.equal("username", [username])]
        );
        //if the user don't exist => create user
        if (response.documents.length === 0) {
          const newUser = this.createUser({ username });
          console.log("New user added:", newUser);
          return newUser;
        }
        //if the user exist => return existing user
        else {
          console.log("User already exists:", response.documents[0]);
          return response.documents[0];
        }
      } catch (error) {
        console.error("Failed to create/check user", error);
      }
    }
  }
  //creating the user
  // prettier-ignore
  async createUser({ username }: createUserProps) {
    if (username) {
      try {
        
        const promise = this.databases.createDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionIdVoters,
          ID.unique(),
          { "username": username }
        );
        return promise;
      } catch (error) {
        console.log("Appwrite service :: createUser() ::", error);
      }
    }
  }
  async getCurrentSession() {
    try {
      const session = await this.account.getSession("current");
      return session.$id;
    } catch (error) {
      console.log("Appwrite service :: getCurrentSession() ::", error);
    }
    return null;
  }
  async logout() {
    try {
      const sessionId: string | null = await this.getCurrentSession();
      if (sessionId) {
        await this.account.deleteSession(sessionId);
      }
    } catch (error) {
      console.log("Appwrite service :: logout() ::", error);
    }
  }
}

const authService = new AuthService();

export default authService;
