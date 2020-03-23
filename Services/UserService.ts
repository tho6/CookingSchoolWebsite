import jsonfile from "jsonfile";
import path from "path";
import { UserDataset } from "../models/user";
import { hashPassword } from "../hash";

export class UserService {
  private userJsonPath: string;

  constructor() {
    this.userJsonPath = path.join(__dirname, '../json/users.json');
  }

  async getUserDataset() {
    const data = await jsonfile.readFile(this.userJsonPath);
    return data as UserDataset;
  }

  async getUsers() {
    const { users } = await this.getUserDataset();
    return users;
  }

  async getUserByUsername(username: string) {
    const users = await this.getUsers();
    const user = users.find(user => user.username == username);
    return user;
  }

  async createUser(username: string, password: string, picture: string) { // edited this
    const dataset = await this.getUserDataset();
    const hashedPassword = await hashPassword(password);
    const user = {
      id: dataset.next_id++,
      username,
      password: hashedPassword,
      picture: picture // edited this
    }
    dataset.users.push(user);
    await jsonfile.writeFile(this.userJsonPath, dataset);
    return user.id;
  }
}