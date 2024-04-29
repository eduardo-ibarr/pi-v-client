// import Footer from "../../components/Footer";
import { useState } from "react";
import Header from "../../components/Header";
import { useLogin } from "../../hooks/auth/useLogin";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync: login } = useLogin();

  async function handleLogin() {
    try {
      await login({ email, password });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Header />
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
            <a href="#" className="hover:border-blue-400 ">
              Esqueceu a senha?
            </a>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default LoginPage;
