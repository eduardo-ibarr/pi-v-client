import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRegisterUser } from "../../hooks/users/useRegisterUser";
import useSendPageViewTrack from "../../hooks/trackings/useSendPageViewTrack";
import {
  Button,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { RegisterData } from "../../models/users";
import moment from "moment";
import { useNavigate } from "react-router-dom";

type FormValues = RegisterData;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const { mutateAsync: registerUser, isSuccess } = useRegisterUser();
  const { mutateAsync: sendTrack } = useSendPageViewTrack();
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    sendTrack({
      event_type: "page_view",
      url: "/register",
      user_id: null,
    });
  }, [sendTrack]);

  if (isSuccess) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-10">
        <div className="bg-white p-8 rounded-md shadow-md w-full max-w-lg">
          <Typography variant="h3" className="text-center mb-6 text-gray-900">
            Cadastro Realizado
          </Typography>
          <Typography className="text-center text-gray-900">
            Seu cadastro foi realizado com sucesso. Agora você já pode fazer seu
            login.
          </Typography>
          <Button
            onClick={() => navigate("/login")}
            fullWidth
            className="my-4 bg-gray-800 text-white"
          >
            Fazer Login
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.password.length < 6) {
      setFormError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    const gender: Record<string, string> = {
      Masculino: "M",
      Feminino: "F",
      Outro: "O",
    };

    try {
      await registerUser({
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
        address: data.address,
        birth_date: moment(data.birth_date).format("YYYY-MM-DD HH:mm:ss"),
        gender: gender[data.gender],
        role: "user",
      });
    } catch (error) {
      setFormError("Ocorreu um erro ao realizar o cadastro. Tente novamente.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-10">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-lg">
        <Typography variant="h3" className="text-center mb-6 text-gray-900">
          Cadastro
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col w-full">
            <Input
              crossOrigin={"anonymous"}
              label="Nome Completo"
              {...register("name", { required: "Nome Completo é obrigatório" })}
              error={!!errors.name}
              className="border p-2 rounded mt-1"
              placeholder="Seu nome completo"
            />
            {errors.name && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.name.message}
              </Typography>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Input
              crossOrigin={"anonymous"}
              label="Telefone"
              {...register("phone", { required: "Telefone é obrigatório" })}
              error={!!errors.phone}
              className="border p-2 rounded mt-1"
              placeholder="(XX) XXXXX-XXXX"
            />
            {errors.phone && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.phone.message}
              </Typography>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Input
              crossOrigin={"anonymous"}
              label="Email"
              type="email"
              {...register("email", { required: "Email é obrigatório" })}
              error={!!errors.email}
              className="border p-2 rounded mt-1"
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
              className="border p-2 rounded mt-1"
              placeholder="*****"
            />
            {errors.password && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.password.message}
              </Typography>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Input
              crossOrigin={"anonymous"}
              label="Endereço"
              {...register("address", { required: "Endereço é obrigatório" })}
              error={!!errors.address}
              className="border p-2 rounded mt-1"
              placeholder="Seu endereço"
            />
            {errors.address && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.address.message}
              </Typography>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Input
              crossOrigin={"anonymous"}
              label="Data de Nascimento"
              type="date"
              {...register("birth_date", {
                required: "Data de nascimento é obrigatória",
              })}
              error={!!errors.birth_date}
              className="border p-2 rounded mt-1"
            />
            {errors.birth_date && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.birth_date.message}
              </Typography>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gênero é obrigatório" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Gênero"
                  error={!!errors.gender}
                  className="border p-2 rounded mt-1"
                  defaultValue=""
                >
                  <Option value="">Selecione seu gênero</Option>
                  <Option value="Masculino">Masculino</Option>
                  <Option value="Feminino">Feminino</Option>
                  <Option value="Outro">Outro</Option>
                </Select>
              )}
            />
            {errors.gender && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.gender.message}
              </Typography>
            )}
          </div>
          {formError && (
            <Typography variant="small" color="red" className="mt-2">
              {formError}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            className="my-4 bg-gray-800 text-white"
          >
            Continuar
          </Button>
        </form>
      </div>
    </div>
  );
}
