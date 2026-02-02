"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { EVENTS_PAGE_SIZE, PAGE_SIZE, clamp, getLatestEvent, toTime } from "../../shared/utils";
import { FetchCompanyById, FetchTrendingCompanies, FetchTrendingCountries } from "./hooks";
import { TrendingCompaniesPage } from "./TrendingCompaniesPage";
import { CountryFilter, type ICompanyEvent } from "./types";

export const TrendingCompanies = () => {
  const [selectedCountry, setSelectedCountry] =useState<CountryFilter | string>(
  CountryFilter.ALL
);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = FetchTrendingCompanies({
    country: selectedCountry,
    page,
    limit: PAGE_SIZE,
  });

  const companies = useMemo(() => data?.data ?? [], [data?.data]);
  const totalPages = useMemo(() => Math.max(1, data?.meta?.totalPages ?? 1), [data?.meta?.totalPages]);
  const totalCompanies = useMemo(
    () => data?.meta?.total ?? companies.length,
    [data?.meta?.total, companies.length]
  );

  useEffect(() => {
    setPage(1);
  }, [selectedCountry]);

  const onPageChange = useCallback((next: number) => {
    setPage((_) => clamp(next, 1, totalPages));
  }, [totalPages]);

  const [companyId, setCompanyId] = useState<number | null>(null);

  const [docUrl, setDocUrl] = useState<string | null>(null);
  const [docTitle, setDocTitle] = useState("");
  const [docZoom, setDocZoom] = useState(1);

  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [eventsPage, setEventsPage] = useState(1);

  useEffect(() => {
    setIsEventsOpen(false);
    setEventsPage(1);
  }, [companyId]);

  const onToggleCompany = useCallback((id: number) => {
    setCompanyId((current) => (current === id ? null : id));
  }, []);

  const onCloseCompany = useCallback(() => setCompanyId(null), []);

  const onOpenDocPreview = useCallback((url: string, title: string) => {
    setDocTitle(title);
    setDocZoom(1);
    setDocUrl(url);
  }, []);

  const onCloseDoc = useCallback(() => setDocUrl(null), []);
  const onDocZoomChange = useCallback((nextZoom: number) => setDocZoom(nextZoom), []);

  const onOpenAllEvents = useCallback(() => {
    setEventsPage(1);
    setIsEventsOpen(true);
  }, []);

  const onCloseAllEvents = useCallback(() => setIsEventsOpen(false), []);

  const { data: countriesFromQuery = [] } = FetchTrendingCountries();

  const countries = useMemo(() => {
    if (countriesFromQuery.length) return countriesFromQuery;

    const unique = new Set<string>();
    for (const c of companies) if (c.companyCountry) unique.add(c.companyCountry);
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [companies, countriesFromQuery]);

  const listCompany = useMemo(
    () => (companyId == null ? null : companies.find((c) => c.companyId === companyId) ?? null),
    [companyId, companies]
  );

  const { data: companyResponse } = FetchCompanyById(companyId, listCompany);

  const company = useMemo(() => {
    if (companyId == null) return null;
    return companyResponse?.data?.[0] ?? listCompany ?? null;
  }, [companyId, companyResponse?.data, listCompany]);

  const sortedEvents: ICompanyEvent[] = useMemo(() => {
    const events = company?.events ?? [];
    return [...events].sort((a, b) => toTime(b.eventDate) - toTime(a.eventDate));
  }, [company?.events]);

  const totalEventPages = useMemo(
    () => Math.max(1, Math.ceil(sortedEvents.length / EVENTS_PAGE_SIZE)),
    [sortedEvents.length]
  );

  useEffect(() => {
    setEventsPage((p) => clamp(p, 1, totalEventPages));
  }, [totalEventPages]);

  const onEventsPageChange = useCallback((next: number) => {
    setEventsPage((_) => clamp(next, 1, totalEventPages));
  }, [totalEventPages]);

  const latestEvent = useMemo(
    () => (company ? getLatestEvent(company.events) : null),
    [company]
  );

  const error = isError ? "Could not load companies from Backend API." : null;

  return (
    <TrendingCompaniesPage
      countries={countries}
      selectedCountry={selectedCountry}
      onCountryChange={setSelectedCountry}
      isLoading={isLoading}
      error={error}
      companies={companies}
      filteredCompaniesLength={totalCompanies}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
      companyId={companyId}
      onToggleCompany={onToggleCompany}
      onCloseCompany={onCloseCompany}
      company={company}
      latestEvent={latestEvent}
      onOpenAllEvents={onOpenAllEvents}
      onOpenDocPreview={onOpenDocPreview}
      isEventsOpen={isEventsOpen}
      sortedEvents={sortedEvents}
      eventsPage={eventsPage}
      totalEventPages={totalEventPages}
      onEventsPageChange={onEventsPageChange}
      onCloseAllEvents={onCloseAllEvents}
      docUrl={docUrl}
      docTitle={docTitle}
      docZoom={docZoom}
      onDocZoomChange={onDocZoomChange}
      onCloseDoc={onCloseDoc}
    />
  );
};
