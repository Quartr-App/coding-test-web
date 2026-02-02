import 'reflect-metadata';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import createConnectionOptions from '../../../ormconfig';
import { Company } from '../../domain/company/entities/company.entity';
import { Event } from '../../domain/company/entities/event.entity';
import { TRENDING_COMPANIES_SAMPLE_DATA } from './trending-companies.sample';

dotenv.config();

const main = async () => {
  const options = createConnectionOptions as any;

  const dataSource = new DataSource({
    ...options,
    entities: [Company, Event],
    migrations: [],
  });

  try {
    await dataSource.initialize();

    const companyRepo = dataSource.getRepository(Company);
    const eventRepo = dataSource.getRepository(Event);

    for (const trendingCompany of TRENDING_COMPANIES_SAMPLE_DATA) {
      await companyRepo.upsert(
        {
          companyId: trendingCompany.companyId,
          companyName: trendingCompany.companyName,
          companyCountry: trendingCompany.companyCountry,
          companyTicker: trendingCompany.companyTicker,
          displayName: trendingCompany.displayName,
          infoUrl: trendingCompany.infoUrl,
          liveUrl: trendingCompany.liveUrl,
          logoLightUrl: trendingCompany.logoLightUrl,
          logoDarkUrl: trendingCompany.logoDarkUrl,
          iconUrl: trendingCompany.iconUrl,
          description: trendingCompany.description,
          reportingCurrency: trendingCompany.reportingCurrency,
          brandColor: trendingCompany.brandColor,
          isins: trendingCompany.isins ?? [],
        },
        ['companyId'],
      );

      const company = await companyRepo.findOne({
        where: { companyId: trendingCompany.companyId },
      });

      if (!company) continue;

      for (const trendingEvent of trendingCompany.events ?? []) {
        const existing = await eventRepo.findOne({
          where: { eventId: trendingEvent.eventId },
        });

        const toSave = {
          ...existing,
          eventId: trendingEvent.eventId,
          eventTitle: trendingEvent.eventTitle,
          eventDate: new Date(trendingEvent.eventDate),
          reportUrl: trendingEvent.reportUrl ?? null,
          pdfUrl: trendingEvent.pdfUrl ?? null,
          audioUrl: trendingEvent.audioUrl ?? null,
          qnaTimestamp: trendingEvent.qnaTimestamp ?? null,
          fiscalPeriod: trendingEvent.fiscalPeriod ?? null,
          fiscalYear: trendingEvent.fiscalYear ?? null,
          company,
        } as Event;

        await eventRepo.save(toSave);
      }
    }

    const companyCount = await companyRepo.count();
    const eventCount = await eventRepo.count();

    console.log(
      `Seed complete. companies=${companyCount} events=${eventCount}`,
    );
  } catch (error) {
    console.error('Failed to Seed trending company data:', error);
    process.exitCode = 1;
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
};

main();
