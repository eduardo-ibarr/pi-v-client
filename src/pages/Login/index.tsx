import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/auth/useLogin";
import { Link, useNavigate } from "react-router-dom";
import useSendPageViewTrack from "../../hooks/trackings/useSendPageViewTrack";
import { getAccessToken } from "../../utils/auth";
import { jwtDecode } from "jwt-decode";
import { TokenData } from "../../hooks/app/useTokenData";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync: login } = useLogin();
  const { mutateAsync: sendTrack } = useSendPageViewTrack();

  const navigate = useNavigate();

  async function handleLogin() {
    try {
      await login({ email, password });

      const token = getAccessToken();
      const tokenDecoded = jwtDecode(token) as TokenData;

      if (tokenDecoded.role === "admin") {
        navigate("/admin/dashboard");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    sendTrack({
      event_type: "page_view",
      url: "/login",
      user_id: null,
    });
  }, [sendTrack]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-6 rounded-md shadow-md">
        <form className="flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="border-2 p-1 rounded  py-2 px-4"
              type="text"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="exemplo@gmail.com"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-base" htmlFor="password">
              Senha
            </label>
            <input
              className="border-2 p-1 rounded  py-2 px-4"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="*****"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-gray-800 w-full text-white cursor-pointer transition duration-1000
            rounded h-9 hover:bg-white hover:text-black"
          >
            Entrar
          </button>
          <button
            type="button"
            className="bg-gray-800 w-full text-white cursor-pointer transition duration-1000
            rounded h-9 hover:bg-white hover:text-black"
          >
            <Link to="/register">Registrar</Link>
          </button>
          <Link className="hover:border-blue-400" to="/forgot-password">
            Esqueceu a senha?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
