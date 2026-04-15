"use client";

import { Inter } from "@next/font/google";
import { useCompanies } from "../hooks/useCompanies";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const [companiesData, fetchingCompanies, errorMessage, retryRequest] = useCompanies();

	return (
		<main>
			<h2 className={inter.className}>Quartr</h2>
			<p className={inter.className}>Trending companies</p>
			<p>{JSON.stringify(companiesData)}</p>
		</main>
	);
}

