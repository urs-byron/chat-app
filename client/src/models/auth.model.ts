export const password_pattern = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
  "g"
);
export const username_pattern = new RegExp("^[a-zA-Z0-9#?!@$%^&*]{8,20}$");
// USED ALONGSIDE .match() method

export interface iAuthInputs {
  username: string;
  password: string;
  rePassword?: string;
}
