import "dotenv/config";

import { RedisMethods } from "../../../services/redis.srvcs";
import { MongoDBMethods } from "../../../services/mongo.srvcs";
import {
  configRequestVars,
  getUserRecipient,
  validateWithinUserReqErr,
  getUserReqs,
  deleteDbRequests,
  deleteCacheRequests,
  updateDbRequests,
  updateCacheRequests,
  getNewCacheRequests,
} from "../../../events/request.event";

describe("Post Request Sub Fxs", () => {
  const OLD_ENV = process.env;

  // TEST VARIABLES
  const requestType = {
    1: 1 as 1 | 2 | 3,
    2: 2 as 1 | 2 | 3,
    3: 3 as 1 | 2 | 3,
  };
  const userId = "sampleUserId";
  const recipientId = "sampleRecipientId";
  const groupId = "sampleGroupId";

  // TEST FXS

  beforeAll(async () => {
    process.env.SERVER_ENV = "TESTING";
    MongoDBMethods.init();
    RedisMethods.init();
    await MongoDBMethods.connect();
    await RedisMethods.connect();
  });

  describe("Path & IDs Assignment Fx", () => {
    test("if fx would return valid object", () => {
      const { requestPath, senderId, receiverId } = configRequestVars(
        requestType[1],
        userId,
        recipientId,
        groupId
      );
      console.log(requestPath, senderId, receiverId);
    });
  });

  afterAll(async () => {
    await MongoDBMethods.flush();
    await RedisMethods.client.flushAll();
    await MongoDBMethods.disconnect();
    await RedisMethods.disconnect();

    process.env = OLD_ENV;
  });
});
