import { jwtDecode } from "jwt-decode";
import { getAccessToken } from "../../utils/auth";

interface TokenData {
  email: string;
  role: string;
}

export default function useTokenData(): TokenData | null {
  const token = getAccessToken();

  if (!token) {
    return null;
  }

  const tokenDecoded = jwtDecode(token) as TokenData;

  return tokenDecoded;
}
