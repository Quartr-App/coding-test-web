"use client";

import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import Companies from "./companies/page"
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const [stuff1, setStuff1] = useState<any>([]);
  // useEffect(() => {
  //   // declare the data fetching function
  //   const fetchData = async () => {
  //     const data = await fetch("/api/companies");
  //     const data2 = await data.json();
  //     console.log(data2);
  //     setStuff1(data2);
  //   };

  //   // call the function
  //   fetchData()
  //     // make sure to catch any error
  //     .catch(console.error);
  // }, []);

  return (
    <main>
      <h2 className={inter.className + " " + "page-title"}>Quartr</h2>
      {/* @ts-expect-error Server Component */}
      <Companies />


      {/* <p className={inter.className}>Trending companies</p>
      <p>{JSON.stringify(stuff1)}</p> */}
    </main>
  );
}
