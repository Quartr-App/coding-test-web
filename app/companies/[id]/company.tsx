"use client";

import { ArrowTopRightOnSquareIcon, ChevronLeftIcon, PlayCircleIcon } from "@heroicons/react/16/solid";
import { notFound, useParams } from "next/navigation";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { IsomorphicDate } from "@/components/date";
import { Divider } from "@/components/divider";
import { CountryFlag } from "@/components/flag";
import { Heading, Subheading } from "@/components/heading";
import { Image } from "@/components/image";
import { Link } from "@/components/link";
import { Table } from "@/components/table";
import { Strong, Text, TextLink } from "@/components/text";
import { getContrastColor } from "@/website/utils/get-contrast-color";
import { getImageSize } from "@/website/utils/get-image-size";
import { useCompany } from "./use-company";

export function Company() {
  const { id } = useParams<{ id: string }>();
  const { data: company } = useCompany(id);

  if (!company) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="max-lg:hidden">
        <Link className="inline-flex items-center gap-2 text-sm/6 text-zinc-500" href="/">
          <ChevronLeftIcon className="size-4 fill-zinc-400" />
          Trending companies
        </Link>
      </div>
      <div className="mbs-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <Image
            alt=""
            className="aspect-3/2 rounded-lg shadow-sm"
            src={company.logoDarkUrl}
            {...getImageSize({ aspectRatio: "3x2", width: 128 })}
          />
          <div>
            <div className="flex flex-wrap items-center gap-x-1">
              <Heading>{company.companyName}</Heading>
              <span aria-hidden="true">·</span>
              <CountryFlag countryCode={company.companyCountry} />
            </div>
            <Badge
              className={`${getContrastColor(company.colorSettings.brandColor)} border`}
              style={{
                backgroundColor: company.colorSettings.brandColor,
              }}
            >
              {company.companyTicker}
            </Badge>
          </div>
        </div>
        <div className="flex gap-4">
          <Button href={company.liveUrl} target="_blank" variant="outline">
            Investors <ArrowTopRightOnSquareIcon />
          </Button>
          <Button href={company.infoUrl} target="_blank">
            Information <ArrowTopRightOnSquareIcon />
          </Button>
        </div>
      </div>
      <Divider className="mbs-8 mbe-6" />
      <Text>{company.description}</Text>
      <Subheading className="mbs-12">Recent events</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]" items={company.events}>
        <Table.Caption position="top">
          Financial reporting is in <Strong>{company.reportingCurrency}</Strong>
        </Table.Caption>
        <Table.Head>
          <Table.Row>
            <Table.Header>Title</Table.Header>
            <Table.Header>Date</Table.Header>
            <Table.Header>Period</Table.Header>
            <Table.Header>Transcript</Table.Header>
            <Table.Header>Report</Table.Header>
            <Table.Header className="text-end">Recording</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {company.events.map(
            ({ eventId, eventDate, eventTitle, fiscalPeriod, fiscalYear, pdfUrl, reportUrl, audioUrl }) => (
              <Table.Row key={eventId} title={`Event #${eventTitle}`}>
                <Table.Cell>{eventTitle}</Table.Cell>
                <Table.Cell className="text-zinc-500">
                  <IsomorphicDate date={eventDate} />
                </Table.Cell>
                <Table.Cell>
                  {fiscalPeriod} {fiscalYear}
                </Table.Cell>
                <Table.Cell>
                  {pdfUrl ? (
                    <TextLink href={pdfUrl} target="_blank">
                      View transcript
                      <ArrowTopRightOnSquareIcon className="size-4 inline ms-1" />
                    </TextLink>
                  ) : (
                    <span className="text-zinc-500">N/A</span>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <TextLink href={reportUrl} target="_blank">
                    View report
                    <ArrowTopRightOnSquareIcon className="size-4 inline ms-1" />
                  </TextLink>
                </Table.Cell>
                <Table.Cell className="text-end">
                  <Button disabled={!audioUrl} variant="plain">
                    <PlayCircleIcon className="size-5" />
                    Play
                  </Button>
                </Table.Cell>
              </Table.Row>
            ),
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
