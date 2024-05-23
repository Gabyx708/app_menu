export const getUser = (): SignInResponse | null => {
  const userStringfy: string | null = sessionStorage.getItem("user");

  if (userStringfy) {
    return JSON.parse(userStringfy);
  }

  return null;
};

export const saveUser = (user: SignInResponse): SignInResponse => {
  const userStringfy = sessionStorage.setItem("user", JSON.stringify(user));
  return user;
};
