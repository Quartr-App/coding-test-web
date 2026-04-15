import { useEffect, useState } from "react";
import { Company } from "../types/company";
import { logger } from "../utils/logging";

export const useCompanies = () => {
	const [retryCounter, setRetryCounter] = useState<number>(0);
	const [fetchingCompanies, setFetchingCompanies] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [companiesData, setCompaniesData] = useState<Company[]>([]);

	useEffect(() => {
		const abortController = new AbortController();

		(async () => {
			try {
				// Add artificial delay to ensure skeleton shows
				await new Promise(resolve => setTimeout(resolve, 2000));

				const companiesResponse = await fetch("/api/companies?slow=5000", {
				// const companiesResponse = await fetch("/api/companies", {
					signal: abortController.signal
				});

				if (!companiesResponse.ok) {
					throw new Error(`There was a problem requesting company data: ${companiesResponse.status}`);
				}

				const companiesData = await companiesResponse.json();

				logger(companiesData);

				setCompaniesData(companiesData.data);
			} catch (error: unknown) {
				if ((error as Error).name === "AbortError") {
					return;
				}

				setErrorMessage((error as Error).message);
			} finally {
				setFetchingCompanies(false);
			}
		})();

		return () => {
			abortController.abort();
		};
	}, [retryCounter]);

	const retryRequest = () => {
		setFetchingCompanies(true);
		setErrorMessage(null);
		setCompaniesData([]);
		setRetryCounter(prev => prev + 1);
	};

	return [companiesData, fetchingCompanies, errorMessage, retryRequest] as const;
};
