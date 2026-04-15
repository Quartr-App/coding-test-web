import { useEffect, useRef, useState } from "react";
import { Company } from "../types/company";
import { logger } from "../utils/logging";

export const useCompanies = () => {
	const abortController = useRef()
	const isFetching = useRef(false)

	const [fetchingCompanies, setFetchingCompanies] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [companiesData, setCompaniesData] = useState<Company[]>([]);

	useEffect(() => {
		if (fetchingCompanies === false) return

		const abortController = new AbortController();

		((async () => {
			if (isFetching.current === true) return

			isFetching.current = true

			try {
				const companiesResponse = await fetch("/api/companies", { signal: abortController.signal });

				if (!companiesResponse.ok) throw new Error(`There was a problem requesting company data: ${companiesResponse.status}`)

				const companiesData = await companiesResponse.json();

				logger(companiesData);

				setCompaniesData(companiesData);
			} catch (error: unknown) {
				if ((error as Error).name === "AbortError") {
					return;
				}

				setErrorMessage((error as Error).message)
			} finally {
				isFetching.current = false

				setFetchingCompanies(false)
			}
		})())

		return () => {
			abortController.abort()
		}
	}, [fetchingCompanies, setCompaniesData, setErrorMessage, setFetchingCompanies]);

	return [companiesData, fetchingCompanies, errorMessage, () => setFetchingCompanies(true)]
}
