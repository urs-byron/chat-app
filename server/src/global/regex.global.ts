export const special_char = `#?!@$%^&*-`;

export const username_pattern: RegExp = new RegExp(
  `^[a-zA-Z0-9${special_char}]{8,20}$`
);
export const password_pattern: RegExp = new RegExp(
  `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[${special_char}]).{8,}$`,
  "g"
);
