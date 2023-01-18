export const getCompanies = async (url: string) => {
  const res = await fetch("/api/companies");
  const data = await res.json();
  return data;
};
