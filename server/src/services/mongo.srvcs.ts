import { User } from "../models/user.model";
import { Group } from "../models/group.model";
import { mongo_opts } from "../global/mongo.global";
import { newServerError } from "../global/serverErrors.global";
import { connect, disconnect } from "mongoose";
import { Chat, ChatMessages, ChatRules } from "../models/chat.model";
import { GenSecurity, GenRequests, GenRelations } from "../models/gen.model";

export class MongoDBMethods {
  private static instance: MongoDBMethods;
  private static dbString: string;
  private static dbType: "dev" | "prod" | "test";

  private constructor() {
    const server_env = process.env.SERVER_ENV;

    if (server_env === "DEVELOPMENT") {
      MongoDBMethods.dbString = process.env.DB_DEV_STRING as string;
      MongoDBMethods.dbType = "dev";
      console.log(`Server -><- MongoDB-${MongoDBMethods.dbType}`);
    } else if (server_env === "TESTING") {
      MongoDBMethods.dbString = process.env.DB_TEST_STRING as string;
      MongoDBMethods.dbType = "test";
    }
  }

  static readonly connect = async (): Promise<void> => {
    try {
      await connect(this.dbString, mongo_opts);
    } catch (err) {
      const new_err = newServerError(
        "cnfg",
        "server failed connecting to mongoDB",
        err
      );
      console.error(new_err);
    }
  };
  static readonly disconnect = async (): Promise<void> => {
    try {
      await disconnect();
      if (this.dbType !== "test")
        console.log(`Server <--> MongoDB-${this.dbType}`);
    } catch (err) {
      console.error("server failed disconnecting from mongoDB");
      console.log(err);
    }
  };

  // static async publicizeUsers() {
  //   try {
  //     await GenSecurity.updateMany({}, { "privacy.availability": false });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  static readonly flush: () => Promise<void> = async () => {
    try {
      await User.deleteMany({});
      await Group.deleteMany({});
      await GenSecurity.deleteMany({});
      await GenRequests.deleteMany({});
      await GenRelations.deleteMany({});
      await Chat.deleteMany({});
      await ChatRules.deleteMany({});
      await ChatMessages.deleteMany({});
    } catch (err) {
      console.error(newServerError("db", "server failed to flush db"));
    }
  };

  static readonly init: () => MongoDBMethods = () => {
    if (!this.instance) this.instance = new MongoDBMethods();
    return this.instance;
  };
}
