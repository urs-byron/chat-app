import { BaseError } from "./httpErrors.global";

interface iError {
  type: string;
  description: string;
  code: string;
  isOperational: boolean;
}

interface iServerError {
  [key: string]: iError;
}

const serverErrors: iServerError = {
  fs: {
    type: "FILE SYSTEM ERROR",
    description:
      "Errors related to file operations, such as reading or writing files, file permissions, or file not found",
    code: "fs",
    isOperational: false,
  },
  cnfg: {
    type: "CONFIGURATION ERROR",
    description:
      "Errors caused by incorrect configuration settings, missing or invalid configuration files",
    code: "cnfg",
    isOperational: false,
  },
  net: {
    type: "NETWORK ERROR",
    description:
      "Errors related to network connectivity issues, DNS resolution failures, or socket errors",
    code: "net",
    isOperational: false,
  },
  db: {
    type: "DATABASE ERROR",
    description:
      "Errors related to database connectivity, query failures, or data integrity issues",
    code: "db",
    isOperational: false,
  },
};

export class ServerError extends BaseError {
  constructor(
    public statusCode: string,
    public name: string,
    public description: string,
    public type: string,
    public isOperational: boolean,
    public errrors?: any
  ) {
    super(statusCode, name, description, type, isOperational);
  }
}

export function newServerError(
  statusCode: "fs" | "cnfg" | "net" | "db",
  name: string,
  err?: any
): ServerError | Error {
  for (const errName in serverErrors) {
    if (errName === statusCode) {
      const serverError = serverErrors[errName];

      return new ServerError(
        statusCode,
        name,
        serverError.description,
        serverError.type,
        serverError.isOperational,
        err ? err : null
      );
    }
  }

  return new Error("invalid server error");
}
