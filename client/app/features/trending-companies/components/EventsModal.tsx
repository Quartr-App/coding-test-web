import { Collapse, Flex, Modal, Typography } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  EVENTS_PAGE_SIZE,
  formatEventDate,
  getEventDocs,
  getSafeAccentColor,
  getSafeBrandColor,
} from "../../../shared/utils";
import styles from "../styles/EventsModal.module.css";
import type { ICompany, ICompanyEvent } from "../types";
import { CompaniesPagination } from "./CompaniesPagination";
import { DocsRow } from "./DocsRow";
import { HeaderModal } from "./HeaderModal";

type EventsModalProps = {
  company: ICompany;
  isOpen: boolean;
  events: ICompanyEvent[];
  page: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;
  onClose: () => void;
  onOpenDocPreview: (url: string, title: string) => void;
};

export const EventsModal = ({
  company,
  isOpen,
  events,
  page,
  totalPages,
  onPageChange,
  onClose,
  onOpenDocPreview,
}: EventsModalProps) => {
  const brand = company.brandColor ?? "";
  const brandColor = getSafeBrandColor(brand);
  const accentColor = getSafeAccentColor(brand);

  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const safeTotalPages = Math.max(1, totalPages);
  const safePage = Math.min(Math.max(1, page), safeTotalPages);

  const companyName = company.displayName || company.companyName;

  useEffect(() => {
    if (!isOpen) return;
    bodyRef.current?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setActiveKeys([]);
  }, [isOpen, safePage]);

  const onCollapseChange = useCallback((next: string | string[]) => {
    setActiveKeys(Array.isArray(next) ? next : [next]);
  }, []);

  const pageEvents = useMemo(() => {
    const start = (safePage - 1) * EVENTS_PAGE_SIZE;
    return events.slice(start, start + EVENTS_PAGE_SIZE);
  }, [events, safePage]);

  const items = useMemo(
    () =>
      pageEvents.map((event, index) => {
        const docs = getEventDocs(event);
        const hasDocs = Boolean(docs.reportUrl || docs.pdfUrl || docs.audioUrl);

        const eventDate = event.eventDate ? formatEventDate(event.eventDate) : "";
        const fiscal = [event.fiscalPeriod, event.fiscalYear].filter(Boolean).join(" ");
        const meta = [eventDate, fiscal].filter(Boolean).join(" · ");

        const absoluteIndex = (safePage - 1) * EVENTS_PAGE_SIZE + index;
        const key = `${event.eventId}-${event.eventDate ?? ""}-${absoluteIndex}`;

        return {
          key,
          label: (
            <Flex vertical gap={4} className={styles.label}>
              <Typography.Text strong className={styles.eventTitle}>
                {event.eventTitle || "Event"}
              </Typography.Text>
              <Typography.Text type="secondary" className={styles.eventMeta}>
                {meta}
              </Typography.Text>
            </Flex>
          ),
          children: hasDocs ? (
            <Flex vertical gap={12} className={styles.content}>
              <DocsRow
                companyName={company.companyName}
                docs={docs}
                onOpenDocPreview={onOpenDocPreview}
                accentColor={accentColor}
                variant="compact"
              />
            </Flex>
          ) : null,
        };
      }),
    [accentColor, company.companyName, onOpenDocPreview, pageEvents, safePage]
  );

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      closable={false}
      footer={null}
      title={
        <HeaderModal
          title={`All events — ${companyName}`}
          brandColor={brandColor}
          onClose={onClose}
        />
      }
      width={680}
    >
      <div ref={bodyRef} className={styles.body}>
        <Collapse
          className={styles.collapse}
          ghost
          activeKey={activeKeys}
          onChange={onCollapseChange}
          items={items}
        />
      </div>

      <Flex justify="center" className={styles.pagination}>
        <CompaniesPagination
          visible={safeTotalPages > 1}
          page={safePage}
          totalPages={safeTotalPages}
          onPageChange={onPageChange}
        />
      </Flex>
    </Modal>
  );
};
