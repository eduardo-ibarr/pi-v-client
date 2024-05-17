import { FaMapMarkerAlt, FaPhone, FaWhatsapp } from "react-icons/fa"; // Certifique-se de instalar este pacote

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto flex justify-center items-center">
        <div className="mr-8">
          <FaMapMarkerAlt className="inline-block mr-2" />
          <span>Localização: Rua Marechal Deodoro, 200, Centro</span>
        </div>
        <div className="mr-8">
          <FaPhone className="inline-block mr-2" />
          <span>Telefone para contato: 55xxxxxxxxx</span>
        </div>
        <div>
          <FaWhatsapp className="inline-block mr-2" />
          <a href="https://api.whatsapp.com" target="_blank" rel="noopener noreferrer">Fale conosco no Whatsapp</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
