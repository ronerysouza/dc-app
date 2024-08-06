export type UserProfileToken = {
  userName: string;
  email: string;
  token: string;
};

export type UserProfile = {
  userName: string;
  email: string;
  phone: string;
  password: string;
  answer: string;
  userType: string;
};

export type UserStorage = {
  userName: string;
  id: string;
  userType: string;
};
