import { Typography } from "@material-tailwind/react";

export default function AboutPage() {
  return (
    <div className="container mx-auto w-full mt-8 px-4 flex flex-col items-center">
      <Typography variant="h4" className="mb-4 text-center">
        Sobre nós
      </Typography>

      <div className="mt-4 w-full md:w-2/3 lg:w-1/2">
        <Typography className="text-justify">
          O brechó comunitário Marilika é um projeto de economia solidária que
          tem como objetivo promover a reutilização de roupas e acessórios, além
          de fomentar a economia local. Nossos produtos são doados pela
          comunidade e vendidos a preços acessíveis.
        </Typography>
        <Typography className="text-justify mt-4">
          É um projeto da Maria Angélica Brum Barbará Medeiros, localizada em
          Santiago, Rio Grande do Sul. O projeto é mantido por ela e por
          voluntários que acreditam na importância da economia solidária e da
          preservação do meio ambiente.
        </Typography>
        <Typography className="text-justify mt-4">
          Nossa missão é promover a sustentabilidade e apoiar a economia local
          através da reutilização de produtos. Nossa visão é um mundo onde o
          consumo consciente é a norma, e nossos valores incluem a
          solidariedade, a inclusão e o respeito pelo meio ambiente.
        </Typography>
      </div>
    </div>
  );
}
