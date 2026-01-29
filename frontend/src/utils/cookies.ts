export const setAuthToken = (token: string) => {
  document.cookie = `accessToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
};

export const getAuthToken = (): string | null => {
  const match = document.cookie.match(/(?:^|; )accessToken=([^;]*)/);
  return match ? match[1] : null;
};

export const removeAuthToken = () => {
  document.cookie = "accessToken=; path=/; max-age=0";
};
