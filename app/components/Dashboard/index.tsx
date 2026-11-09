"use client";

import Link from "next/link";
import { useState } from "react";
import { useCompanyData } from "../../../lib/api/fetchCompany";
import Card from "../Card";
import SkeletonCard from "../SkeletonCard";

const DashBoard = () => {
  const { companyData, isLoading, error } = useCompanyData();
  const [openCompanyId, setOpenCompanyId] = useState<number | null>(null);
  if (isLoading) {
    return (
      <div>
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <div className="">
      <h3 className="subtitle">Trending companies</h3>
      {companyData.map((company) => (
        <div key={company.companyId} className="">
          <Card
            company={company}
            isOpen={openCompanyId === company.companyId}
            onToggle={() => {
              setOpenCompanyId((prev) =>
                prev === company.companyId ? null : company.companyId,
              );
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DashBoard;
