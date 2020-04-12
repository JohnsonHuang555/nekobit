type BaseType = {
  id?: string;
  name: string;
};

export type TGuest = BaseType;
export type TLogin = BaseType & {
  account: string;
  password: string;
};

export type TRegister = {
  success: boolean;
  message?: string;
}
