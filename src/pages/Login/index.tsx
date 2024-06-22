import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLogin } from "../../hooks/auth/useLogin";
import { Link, useNavigate } from "react-router-dom";
import useSendPageViewTrack from "../../hooks/trackings/useSendPageViewTrack";
import { getAccessToken } from "../../utils/auth";
import { TokenData } from "../../hooks/app/useTokenData";
import { Button, Input, Typography } from "@material-tailwind/react";
import { jwtDecode } from "jwt-decode";

type FormValues = {
  email: string;
  password: string;
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { mutateAsync: login } = useLogin();
  const { mutateAsync: sendTrack } = useSendPageViewTrack();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    try {
      setError(null);
      setLoading(true);
      await login({ email, password });

      const token = getAccessToken();
      const tokenDecoded = jwtDecode(token) as TokenData;

      if (tokenDecoded.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Erro ao fazer login. Verifique suas credenciais e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sendTrack({
      event_type: "page_view",
      url: "/login",
      user_id: null,
    });
  }, [sendTrack]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" p-6 rounded-md shadow-md w-full max-w-lg">
        <form
          className="flex flex-col items-center justify-center gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h3" className="text-center">
            Bem-vindo de volta!
          </Typography>
          {error && (
            <div className="mb-4 text-red-600 bg-red-100 p-2 rounded-md w-full text-center">
              {error}
            </div>
          )}
          <div className="flex flex-col w-full">
            <Input
              crossOrigin={"anonymous"}
              label="Email"
              type="email"
              {...register("email", { required: "Email é obrigatório" })}
              error={!!errors.email}
              className="border-2 p-2 rounded mt-1"
              placeholder="exemplo@gmail.com"
            />
            {errors.email && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.email.message}
              </Typography>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Input
              crossOrigin={"anonymous"}
              label="Senha"
              type="password"
              {...register("password", { required: "Senha é obrigatória" })}
              error={!!errors.password}
              className="border-2 p-2 rounded mt-1"
              placeholder="*****"
            />
            {errors.password && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.password.message}
              </Typography>
            )}
            <div className="flex justify-end w-full mt-2">
              <Link to="/forgot-password">
                <Typography className="hover:underline">
                  Esqueceu a senha?
                </Typography>
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            fullWidth
            className=" bg-gray-800"
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>

          <div className="flex justify-center w-full">
            <Link to="/register">
              <Typography className="hover:underline">
                Não tem uma conta? Registre-se
              </Typography>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
