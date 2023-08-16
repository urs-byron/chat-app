interface iHTTPError {
  type: string;
  description: string;
  code: number;
  isOperational: boolean;
}

type iHTTPErrors = {
  [key: number]: iHTTPError;
};

const HTTPErrors: iHTTPErrors = {
  400: {
    type: "CLIENT ERROR",
    description: "BAD REQUEST",
    code: 400,
    isOperational: true,
  },
  401: {
    type: "CLIENT ERROR",
    description: "UNAUTHORIZED",
    code: 401,
    isOperational: true,
  },
  402: {
    type: "CLIENT ERROR",
    description: "PAYMENT REQUIRED",
    code: 402,
    isOperational: true,
  },
  403: {
    type: "CLIENT ERROR",
    description: "FORBIDDEN",
    code: 403,
    isOperational: true,
  },
  404: {
    type: "CLIENT ERROR",
    description: "NOT FOUND",
    code: 404,
    isOperational: true,
  },
  405: {
    type: "CLIENT ERROR",
    description: "METHOD NOT ALLOWED",
    code: 405,
    isOperational: true,
  },
  406: {
    type: "CLIENT ERROR",
    description: "NOT ACCEPTABLE",
    code: 406,
    isOperational: true,
  },
  408: {
    type: "CLIENT ERROR",
    description: "REQUEST TIMEOUT",
    code: 408,
    isOperational: true,
  },
  500: {
    type: "SERVER ERROR",
    description: "INTERNAL SERVER ERROR",
    code: 500,
    isOperational: true,
  },
  501: {
    type: "SERVER ERROR",
    description: "NOT IMPLEMENTED",
    code: 501,
    isOperational: true,
  },
  502: {
    type: "SERVER ERROR",
    description: "BAD GATEWAY",
    code: 502,
    isOperational: true,
  },
  503: {
    type: "SERVER ERROR",
    description: "SERVICE NOT AVAILABLE",
    code: 503,
    isOperational: true,
  },
  504: {
    type: "SERVER ERROR",
    description: "GATEWAY TIMEOUT",
    code: 504,
    isOperational: true,
  },
  505: {
    type: "SERVER ERROR",
    description: "HTTP VERSION NOT SUPPORTED",
    code: 505,
    isOperational: true,
  },
  511: {
    type: "SERVER ERROR",
    description: "NETWORK AUTHENTICATION REQUIRED",
    code: 511,
    isOperational: true,
  },
};

export abstract class BaseError extends Error {
  constructor(
    public statusCode: number | string,
    public name: string,
    public description: string,
    public type: string,
    public isOperational: boolean
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

export class APIError extends BaseError {
  constructor(
    public statusCode: number,
    public name: string,
    public description: string,
    public type: string,
    public isOperational: boolean,
    public errrors?: any
  ) {
    super(statusCode, name, description, type, isOperational);
  }
}

export function newApiError(
  statusCode: number,
  name: string,
  err?: any
): APIError | Error {
  for (const errName in HTTPErrors) {
    if (errName === statusCode.toString()) {
      const apiError: iHTTPError = HTTPErrors[statusCode];

      const nerr = new APIError(
        statusCode,
        name,
        apiError.description,
        apiError.type,
        apiError.isOperational,
        err ? err : null
      );
      return nerr;
    }
  }
  return new Error("invalid http error");
}
