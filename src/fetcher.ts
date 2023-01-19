export const getCompanies = async () => {
  const res = await fetch("/api/companies");
  const data = await res.json();
  return data;
};

