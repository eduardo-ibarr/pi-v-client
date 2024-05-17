import { jwtDecode } from "jwt-decode";
import moment from "moment";

export const ACCESS_TOKEN = "auth-token";

export const clearAccessToken = (): void =>
  localStorage.removeItem(ACCESS_TOKEN);

export const getAccessToken = () => {
  const data = localStorage.getItem(ACCESS_TOKEN);
  const now = moment().utc();

  if (data) {
    const result = JSON.parse(data);
    const decoded = jwtDecode(result.token) as any;

    if (decoded.exp < now.unix()) {
      clearAccessToken();
      return null;
    }

    return result.token;
  }

  return null;
};

export const setAccessToken = (data: any): void => {
  localStorage.setItem(ACCESS_TOKEN, JSON.stringify(data));
};
