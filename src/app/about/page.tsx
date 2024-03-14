import React from "react";
import { CompanyInfo } from "@/types";

async function GET() {
  const response = await fetch(`http://localhost:4000/companyInfo`, {
    cache: "force-cache",
  });
  const companyInfo = await response.json();

  if (!companyInfo) {
    return "회사 정보를 불러오는데 실패했습니다.";
  }

  return companyInfo;
}

const About = async () => {
  const companyInfo: CompanyInfo | string = await GET();

  if (typeof companyInfo == "string") {
    return <p>{companyInfo}</p>;
  } else {
    return (
      <main>
        <h1>회사 정보</h1>
        <p>이름 : {companyInfo.name}</p>
        <p>설명 : {companyInfo.description}</p>
      </main>
    );
  }
};

export default About;
