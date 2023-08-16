export const userPrivacy: iUserPrivacy = {
  public: "public",
  availability: "availability",
};

export interface iAuthInputs {
  username: string;
  password: string;
  rePassword?: string;
}

export interface iUserPrivacy {
  public: "public";
  availability: "availability";
}

export interface iUserPassword {
  password: string;
  rePassword: string;
}

export interface iValidityType {
  isValid: boolean;
  error: Array<null | string> | null;
}
