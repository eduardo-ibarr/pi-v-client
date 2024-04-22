import React, { useState, FormEvent, ChangeEvent } from 'react';

function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  // Função para formatar o número de telefone com a máscara desejada
  const formatPhoneNumber = (input: string) => {
    // Remove todos os caracteres não numéricos
    const cleaned = input.replace(/\D/g, '');
    
    // MÁSCARA (55)XXXXX-XXXX
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return input;
  };

  // Manipula a mudança no campo de telefone e aplica a formatação
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Remove caracteres não numéricos
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
      <div className="w-96 p-8 border rounded shadow bg-white">
        <h2 className="text-center text-2xl font-bold mb-4">CADASTRO</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="font-bold">Nome Completo</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="font-bold">Telefone</label>
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
            <label htmlFor="email" className="font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="password" className="font-bold">Senha (mínimo 6 caracteres)</label>
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
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-700"
          >
            CONTINUAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
