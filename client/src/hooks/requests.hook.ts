import { iAuthInputs } from "../models/auth.model";
import { iChatReqBody } from "../models/chat.model";
import { iRelBody, iRequestBody } from "../models/gen.model";
import { iNewGrpBody } from "../models/group.model";
import { iHttpResponse } from "../models/http.model";
import { iRelationAct, iSearchValues } from "../models/peer.model";
import {
  iUserPatchRequest,
  iContactTypes,
  iPrivacyRequest,
  iRequestActions,
} from "../models/user.model";

export async function httpPostLogin(loginBody: iAuthInputs) {
  let response;
  let data!: iHttpResponse;

  try {
    response = await fetch("/1/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(loginBody),
    });
  } catch (err) {
    return err;
  }

  try {
    data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function httpPostRegister(regBody: iAuthInputs) {
  let response;
  let data!: iHttpResponse;

  try {
    response = await fetch("/1/auth/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(regBody),
    });
  } catch (err) {
    return err;
  }

  try {
    data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function httpGetAuth() {
  let response;
  let data!: iHttpResponse;

  try {
    response = await fetch("/1/auth", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }

  try {
    data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function httpGetUsers(searchValues: iSearchValues) {
  let response;
  let data!: iHttpResponse;

  try {
    response = await fetch(`/1/user/search/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchValues),
    });
  } catch (err) {
    return err;
  }

  try {
    data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function httpPostUserRequest(requestBody: iRequestBody) {
  let response!: Response;
  let data!: iHttpResponse;

  try {
    response = await fetch("/1/request", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  } catch (err) {
    return err;
  }

  try {
    data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function httpPutUserRequest(
  requestBody: iRequestBody,
  requestAction: iRequestActions
) {
  let response;
  let data!: iHttpResponse;

  try {
    response = await fetch(`/1/request/${requestAction}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  } catch (err) {
    return err;
  }

  try {
    data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function httpPutUserPrivacy(userSettings: iPrivacyRequest) {
  let response;
  let data!: iHttpResponse;

  try {
    response = await fetch(`/1/user/settings`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userSettings),
    });
  } catch (err) {
    return err;
  }

  try {
    data = await response.json();
    return data;
  } catch (err) {}
}

export async function httpPutUserPassword(passwordSet: {
  password: string;
  rePassword: string;
}) {
  let response;
  let data!: iHttpResponse;

  try {
    response = await fetch("/1/user/settings/password", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordSet),
    });
  } catch (err) {
    return err;
  }

  try {
    data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function httpGetLogout() {
  let response: Response;
  let data!: iHttpResponse;

  try {
    response = await fetch("/1/auth/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }

  try {
    data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function httpGetUser() {
  let response: Response;
  let data!: iHttpResponse;

  try {
    response = await fetch("/1/user", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return err;
  }

  try {
    data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function httpGetUserRelations(relBody: iRelBody) {
  let response: Response;
  let data!: iHttpResponse;

  try {
    response = await fetch(`/1/relation`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(relBody),
    });
  } catch (err) {
    return err;
  }

  try {
    data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function httpPatchRelation(relationAct: iRelationAct) {
  let response: Response;
  let data!: iHttpResponse;

  try {
    response = await fetch("/1/relation", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(relationAct),
    });
  } catch (err) {
    return err;
  }

  try {
    data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function httpGetGroup(groupId: string) {
  let response: Response;
  let data!: iHttpResponse;

  try {
    response = await fetch(`/1/group/${groupId}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return err;
  }

  try {
    data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function httpGetGroups() {
  let response: Response;
  let data!: iHttpResponse;

  try {
    response = await fetch("/1/group", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return err;
  }

  try {
    data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function httpPostGroup(newGrp: iNewGrpBody) {
  let response: Response;
  let data!: iHttpResponse;

  try {
    response = await fetch("/1/group", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGrp),
    });
  } catch (err) {
    return err;
  }

  try {
    data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function httpGetMsgs(chatData: iChatReqBody) {
  let response: Response;
  let data!: iHttpResponse;

  try {
    response = await fetch("/1/chat", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chatData),
    });
  } catch (err) {
    return err;
  }

  try {
    data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function httpGetTopMsg(chatIds: string[]) {
  let response: Response;
  let data!: iHttpResponse;

  try {
    response = await fetch(`/1/chat/top`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chatIds),
    });
  } catch (err) {
    return err;
  }

  try {
    data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}
