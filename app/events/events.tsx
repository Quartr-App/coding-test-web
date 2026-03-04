"use client";

import { ArrowTopRightOnSquareIcon, PlayCircleIcon } from "@heroicons/react/16/solid";
import { Button } from "@/components/button";
import { IsomorphicDate } from "@/components/date";
import { Heading } from "@/components/heading";
import { Table } from "@/components/table";
import { Strong, TextLink } from "@/components/text";
import { useEvents } from "./use-events";

export function Events() {
  const { data: events } = useEvents();

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-end justify-between gap-4">
        <Heading>Events</Heading>
      </div>
      {events.length === 0 ? (
        <Strong aria-live="polite" className="mbs-6 block">
          No events found.
        </Strong>
      ) : (
        <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]" items={events}>
          <Table.Head>
            <Table.Row>
              <Table.Header>Company</Table.Header>
              <Table.Header>Title</Table.Header>
              <Table.Header>Date</Table.Header>
              <Table.Header>Period</Table.Header>
              <Table.Header>Transcript</Table.Header>
              <Table.Header>Report</Table.Header>
              <Table.Header className="text-end">Recording</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {events.map(
              ({
                eventId,
                eventDate,
                eventTitle,
                fiscalPeriod,
                fiscalYear,
                pdfUrl,
                reportUrl,
                audioUrl,
                companyId,
                companyName,
              }) => (
                <Table.Row key={eventId} title={`Event #${eventTitle}`}>
                  <Table.Cell>
                    <TextLink href={`/companies/${companyId}`}>{companyName}</TextLink>
                  </Table.Cell>
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
      )}
    </div>
  );
}
