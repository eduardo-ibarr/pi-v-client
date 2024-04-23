import React, { useState, FormEvent, ChangeEvent } from 'react';
import Header from "../../components/Header";
import Footer from '../../components/Footer';

function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const formatPhoneNumber = (input: string) => {
    const cleaned = input.replace(/\D/g, '');
    // MÁSCARA (55)XXXXX-XXXX
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return input;
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    const formattedPhone = formatPhoneNumber(input);
    setPhone(formattedPhone);
  };
  
  // LIDAR COM SUBMIT DO FORMS
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 6) {
      setFormError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    console.log({ fullName, phone, email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-96 p-6 rounded-md bg-gray-100 p-6 rounded-md shadow-md">
        <h2 className="text-center text-2xl mb-4 ">CADASTRO</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="">Nome Completo</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="">Telefone</label>
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={15}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="password" className="">Senha (mínimo 6 caracteres)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {formError && <p className="text-red-500">{formError}</p>}
          <button
            type="submit"
            className="bg-gray-800 w-full text-white cursor-pointer transition duration-1000
            rounded py-2 hover:bg-white hover:text-black "
          >
            CONTINUAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
