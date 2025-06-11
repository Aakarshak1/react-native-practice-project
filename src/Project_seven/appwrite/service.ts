import { Account, Client, ID } from 'appwrite';
import Config from 'react-native-config';
import Snackbar from 'react-native-snackbar';

const APPWRITE_ENDPOINT = Config.APPWRITE_ENDPOINT as string;
const APPWRITE_PROJECT_ID = Config.APPWRITE_PROJECT_ID as string;

const appwriteClient = new Client();

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};
type LoginUserAccount = {
  email: string;
  password: string;
};

class AppwriteSerivce {
  account;

  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);
    this.account = new Account(appwriteClient);
  }

  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        // you can create what you want to do once account is created
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('Appwrite service :: getCurrentAccount() :: ' + error);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession('current');
    } catch (error) {
      console.log('Appwrite service :: getCurrentAccount() :: ' + error);
    }
  }
}

export default AppwriteSerivce;
