import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="m-4 p-4 flex gap-4 border">
      <Link href="/about">ABOUT</Link>
      <Link href="/report">REPORT</Link>
      <Link href="/todos-csr">TODOS-CSR</Link>
      <Link href="/todos-ssr">TODOS-SSR</Link>
    </nav>
  );
};

export default NavBar;
