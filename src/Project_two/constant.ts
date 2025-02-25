export const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
export const digitChars = '0123456789';
export const specialChars = '!@#$%^&*()_+';

export type InitialOptionsType = {
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

export const initialOptions = {
  lowercase: true,
  uppercase: false,
  numbers: false,
  symbols: false,
};
