import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useForgotPassword } from "../../hooks/users/useForgotPassword";
import { useResetPassword } from "../../hooks/users/useResetPassword";
import { useNavigate } from "react-router-dom";
import useSendPageViewTrack from "../../hooks/trackings/useSendPageViewTrack";

const ForgotPassword: React.FC = () => {
  const {
    mutateAsync: forgotPassword,
    isError: isForgotPasswordError,
    error: forgotPasswordError,
    isSuccess: isForgotPasswordSuccess,
  } = useForgotPassword();

  const {
    mutateAsync: resetPassword,
    isError: isResetPasswordError,
    error: resetPasswordError,
    isSuccess: isResetPasswordSuccess,
  } = useResetPassword();

  const { mutateAsync: sendTrack } = useSendPageViewTrack();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const handleSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("Por favor, insira um endereço de e-mail válido.");
      return;
    }

    await forgotPassword({ email });
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newPassword) {
      setError("Por favor, insira uma nova senha.");
      return;
    }

    await resetPassword({ email, password: newPassword, token });
  };

  const handleBack = () => {
    setStep(1);
    setError("");
  };

  useEffect(() => {
    if (isForgotPasswordSuccess) {
      setError("");
      setStep(2);
    }

    if (isResetPasswordSuccess) {
      setError("");
      setStep(3);
    }

    if (isForgotPasswordError) {
      setError(
        forgotPasswordError.message ||
          "Ocorreu um erro ao enviar o e-mail. Por favor, tente novamente."
      );
    }

    if (isResetPasswordError) {
      setError(
        resetPasswordError.message ||
          "Ocorreu um erro ao redefinir a senha. Por favor, tente novamente."
      );
    }
  }, [
    isForgotPasswordSuccess,
    isResetPasswordSuccess,
    isForgotPasswordError,
    isResetPasswordError,
    forgotPasswordError,
    resetPasswordError,
  ]);

  useEffect(() => {
    sendTrack({
      event_type: "page_view",
      url: "/forgot-password",
      user_id: null,
    });
  }, [sendTrack]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          {step === 1 && (
            <>
              <Typography variant="h3">Esqueceu sua senha?</Typography>
              <Typography className="mt-4">
                Insira seu endereço de e-mail abaixo e enviaremos um link para
                redefinir sua senha.
              </Typography>
              <form
                onSubmit={handleSubmitEmail}
                className="mt-4 mb-4 space-y-6"
              >
                <div className="rounded-md shadow-sm -space-y-px">
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    label="Endereço de e-mail"
                    type="email"
                    autoComplete="email"
                    required
                    crossOrigin={undefined}
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button className="bg-gray-800" fullWidth type="submit">
                  Enviar
                </Button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <Typography variant="h3">Token enviado!</Typography>
              <Typography className="mt-4">
                Enviamos um e-mail com um token de redefinição no seu email,
                válido por 15 minutos. Por favor, insira o token abaixo:
              </Typography>
              <form
                onSubmit={handleResetPassword}
                className="mt-4 mb-4 space-y-6"
              >
                <div className="rounded-md shadow-sm">
                  <div>
                    <Input
                      onChange={(e) => setToken(e.target.value)}
                      label="Token de redefinição"
                      required
                      crossOrigin={undefined}
                    />
                  </div>

                  <div className="mt-4">
                    <Input
                      onChange={(e) => setNewPassword(e.target.value)}
                      label="Nova senha"
                      type="password"
                      required
                      crossOrigin={undefined}
                    />
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex justify-between items-center mt-4">
                  <Button
                    className="text-gray-800"
                    onClick={handleBack}
                    variant="outlined"
                  >
                    Voltar
                  </Button>
                  <Button type="submit" className="bg-gray-800">
                    Redefinir senha
                  </Button>
                </div>
              </form>
            </>
          )}

          {step === 3 && (
            <div className="flex  items-center flex-col">
              <Typography variant="h3" className="text-center">
                Senha redefinida!
              </Typography>
              <Typography className="mt-4 text-center">
                Sua senha foi redefinida com sucesso! <br /> Clique no botão
                abaixo para fazer login.
              </Typography>
              <Button
                onClick={() => navigate("/login")}
                className="bg-gray-800 mt-4 w-40"
              >
                Fazer login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
