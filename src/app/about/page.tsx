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
    return <p className="m-4">{companyInfo}</p>;
  } else {
    return (
      <main className="m-4">
        <h1 className="my-1">회사 정보</h1>
        <p className="my-1">이름 : {companyInfo.name}</p>
        <p className="my-1">설명 : {companyInfo.description}</p>
      </main>
    );
  }
};

export default About;
