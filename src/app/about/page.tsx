import Image from "next/image";
import React from "react";
import type { Company } from "../../../types";

const AboutPage = async () => {
  const response = await fetch("http://localhost:4000/company", {
    cache: "force-cache",
  });

  const company: Company = await response.json();
  const { name, description, image } = company;

  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <Image src={image} alt={name} width={200} height={200} />
    </div>
  );
};
export default AboutPage;
