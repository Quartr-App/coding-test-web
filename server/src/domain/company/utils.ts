import { CompanyResponseOutput, EventResponseOutput } from './dto/output';
import { Company } from './entities/company.entity';
import { Event } from './entities/event.entity';

export const mapEventToOutput = (event: Event): EventResponseOutput => {
  return {
    id: event.id,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
    eventId: event.eventId,
    eventTitle: event.eventTitle,
    eventDate: event.eventDate,
    reportUrl: event.reportUrl,
    pdfUrl: event.pdfUrl,
    audioUrl: event.audioUrl,
    qnaTimestamp: event.qnaTimestamp,
    fiscalPeriod: event.fiscalPeriod,
    fiscalYear: event.fiscalYear,
  };
};

export const mapCompanyToOutput = (company: Company): CompanyResponseOutput => {
  const events: EventResponseOutput[] = (company.events ?? [])
    .slice()
    .sort(
      (a, b) =>
        new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime(),
    )
    .map(mapEventToOutput);

  return {
    id: company.id,
    createdAt: company.createdAt,
    updatedAt: company.updatedAt,
    companyId: company.companyId,
    companyName: company.companyName,
    companyCountry: company.companyCountry,
    companyTicker: company.companyTicker,
    displayName: company.displayName,
    infoUrl: company.infoUrl,
    liveUrl: company.liveUrl,
    logoLightUrl: company.logoLightUrl,
    logoDarkUrl: company.logoDarkUrl,
    iconUrl: company.iconUrl,
    description: company.description,
    reportingCurrency: company.reportingCurrency,
    brandColor: company.brandColor,
    isins: company.isins ?? [],
    events,
  };
};
