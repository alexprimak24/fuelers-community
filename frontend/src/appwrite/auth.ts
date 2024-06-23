import conf from "../conf/conf";
import { Client, Account, ID, OAuthProvider } from "appwrite";

export interface createAccountProps {
  email: string;
  password: string;
  name: string;
}

export interface loginProps {
  email: string;
  password: string;
}

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async handleLogin() {
    try {
      await this.account.createOAuth2Session(
        OAuthProvider.Discord,
        "http://localhost:3000/",
        "http://localhost:3000/"
      );
    } catch (error) {
      console.log("Appwrite service :: handleLogin() ::", error);
    }
  }
}

const authService = new AuthService();

export default authService;
