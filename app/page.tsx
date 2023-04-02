"use client";

import { Suspense, useEffect, useState } from "react";
import { CompanyI } from "app/Company";
import CompanyList from "./CompanyList"; 
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorComponent from "./error";

interface data_jsonI {
    data: CompanyI[];
}

export default function Home() {
    const [companies, setCompanies] = useState<CompanyI[]>([]);
    const [fetching, setFetching] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [data_res_status, setdata_res_status] = useState<number>(500);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setFetching(true);
            try {
                const data_res = await fetch("/api/companies");
                console.log(data_res.status);

                if (data_res.status !== 200) {
                    setLoading(false);
                    setError("Failed to fetch data");
                    setdata_res_status(500);
                } else if (data_res.status === 200) {
                    const data_json: data_jsonI = await data_res.json();
                    setCompanies(data_json.data);
                    setLoading(false);
                    setdata_res_status(200);
                }
            } catch (error) {
                setLoading(false);
                setError("There seems to be a server error");
            }
            setFetching(false);
        };

        fetchData();
    }, []);

    return (
        <main>
            <h1>Quartr</h1>
            <h2>Trending companies</h2>
            {fetching ? (
                <LoadingSkeleton/>
            ) : data_res_status != 200 ? (
                <ErrorComponent />
            ) : (
                <CompanyList companies={companies} />
            )}
        </main>
    );
}
