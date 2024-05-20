import { useEffect } from "react";
import useLogout from "../../hooks/auth/useLogout";
import { Button, Typography } from "@material-tailwind/react";
import { clearAccessToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { mutateAsync: logout } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    clearAccessToken();
  }, [logout]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-[100vh]">
      <Typography color="blue-gray" variant="h4">
        Você foi deslogado com sucesso!
      </Typography>
      <Button onClick={() => navigate("/login")}>
        Voltar para a página de login
      </Button>
    </div>
  );
}
