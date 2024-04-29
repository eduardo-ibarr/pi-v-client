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

    if (result && moment(result.expirationDate).utc() > now) {
      return result;
    }

    clearAccessToken();

    return null;
  }

  return null;
};

export const setAccessToken = (data: any): void => {
  const now = moment().utc();
  const expiresAt = moment(now).add(data.expiresIn, "seconds");

  const decodedToken: { email: string; role: string } = jwtDecode(data.token);

  const tokenData = {
    ...data,
    email: decodedToken.email,
    role: decodedToken.role,
    expirationDate: expiresAt,
  };

  localStorage.setItem(ACCESS_TOKEN, JSON.stringify(tokenData));
};
