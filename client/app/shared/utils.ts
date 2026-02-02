import type { ICompany, ICompanyEvent, IEventDocs } from "../features/trending-companies/types";

export const PAGE_SIZE = 5;
export const EVENTS_PAGE_SIZE = 5;

export const getCompanyLogo = (
  company: ICompany,
): { src: string; alt: string } | null => {
  const src = company.logoDarkUrl ?? company.iconUrl ?? company.logoLightUrl;
  if (!src) return null;

  const alt = `${company.displayName || company.companyName} logo`;
  return { src, alt };
};

export const isNearWhite = (hex: string): boolean => {
  const match = /^#?([0-9a-fA-F]{6})$/.exec(hex.trim());
  if (!match) return false;
  const value = match[1];
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return r > 245 && g > 245 && b > 245;
};

export const getSafeBrandColor = (brandColor: string | undefined): string => {
  const raw = (brandColor ?? "").trim();
  if (!raw) return "rgba(0, 0, 0, 0.12)";
  if (isNearWhite(raw)) return "rgba(0, 0, 0, 0.30)";
  return raw;
};

export const getSafeAccentColor = (
  brandColor: string | undefined,
): string | undefined => {
  const raw = (brandColor ?? "").trim();
  if (!raw) return undefined;
  if (isNearWhite(raw)) return "rgba(0, 0, 0, 0.55)";
  return raw;
};

export const countryCodeToFlagEmoji = (countryCode: string): string => {
  const code = countryCode.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return "";

  const A = 0x1f1e6;
  const first = (code.codePointAt(0) ?? 65) - 65;
  const second = (code.codePointAt(1) ?? 65) - 65;
  return String.fromCodePoint(A + first, A + second);
};

export const formatEventDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
};

export const getLatestEvent = (
  events: ICompanyEvent[] | undefined,
): ICompanyEvent | null => {
  if (!events || events.length === 0) return null;

  const now = Date.now();
  const withTime = events
    .map((event) => ({ event, time: new Date(event.eventDate).getTime() }))
    .filter((x) => !Number.isNaN(x.time));

  if (withTime.length === 0) return events[0] ?? null;

  const future = withTime
    .filter((x) => x.time >= now)
    .sort((a, b) => a.time - b.time);
  if (future.length > 0) return future[0].event;

  const past = [...withTime].sort((a, b) => b.time - a.time);
  return past[0]?.event ?? null;
};

export const getEventDocs = (event: ICompanyEvent | null): IEventDocs => {
  const reportUrl = event?.reportUrl || undefined;
  const pdfUrl = event?.pdfUrl || undefined;
  const audioUrl = event?.audioUrl || undefined;

  return {
    reportUrl,
    pdfUrl,
    audioUrl,
    label: event?.eventTitle ? `${event.eventTitle} docs` : "Latest docs",
  };
};

export const clamp = (n: number, min: number, max: number) => Math.min(Math.max(min, n), max);

export const toTime = (dateStr?: string) => {
  const t = new Date(dateStr ?? "").getTime();
  return Number.isNaN(t) ? -Infinity : t;
};