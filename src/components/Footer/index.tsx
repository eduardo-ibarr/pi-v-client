import { Typography } from "@material-tailwind/react";
import { FaMapMarkerAlt, FaPhone, FaWhatsapp } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto flex justify-center items-center">
        <div className="mr-8">
          <a
            href="https://maps.app.goo.gl/Lvm11NyuX65c91Wm6"
            target="_blank"
            className="flex"
          >
            <FaMapMarkerAlt className="inline-block mr-2" />
            <Typography className="text-sm">
              Rua Marechal Deodoro, 200, Centro, Santiago - RS
            </Typography>
          </a>
        </div>
        <div className="mr-8 flex">
          <FaPhone className="inline-block mr-2" />
          <Typography className="text-sm">Contato: 55 99677-1573</Typography>
        </div>
        <div>
          <FaWhatsapp className="inline-block mr-2" />
          <a
            href="https://wa.me/5555996771573?text=Olá, gostaria de falar com vocês!"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm"
          >
            Fale conosco no Whatsapp
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
