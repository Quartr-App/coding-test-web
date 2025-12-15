import { CompanyEvent } from "../../pages/api/companies/[id]/events";
import { useRequest } from "./useRequest";

export function useCompanyEvents(id: number) {
  const { data, loading, error } = useRequest<{ data: CompanyEvent[] }>(
    `/api/companies/${id}/events`
  );

  return {
    events: data?.data,
    loading,
    error,
  };
}
