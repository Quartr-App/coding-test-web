import { Button, Space, Typography } from "antd";
import { getSafeAccentColor } from "../../../shared/utils";
import styles from "../styles/DocsSectionPopover.module.css";
import type { ICompany, IEventDocs } from "../types";
import { DocsRow } from "./DocsRow";

type DocsSectionPopoverProps = {
  company: ICompany;
  docs: IEventDocs;
  onOpenAllEvents: () => void;
  onOpenDocPreview: (url: string, title: string) => void;
};

export const DocsSectionPopover = (props: DocsSectionPopoverProps) => {
  if (!props.docs.reportUrl && !props.docs.pdfUrl && !props.docs.audioUrl) return null;

  const totalEvents = props.company.events?.length ?? 0;
  const accentColor = getSafeAccentColor(props.company.brandColor ?? undefined);

  return (
    <Space orientation="vertical" size={10} className={styles.root}>
      <Space align="center" className={styles.header}>
        <Typography.Text strong>{props.docs.label}</Typography.Text>
        {totalEvents > 1 ? (
          <Button type="link" onClick={props.onOpenAllEvents} className={styles.viewAllBtn}>
            View all events
          </Button>
        ) : null}
      </Space>

      <DocsRow
        companyName={props.company.companyName}
        docs={props.docs}
        onOpenDocPreview={props.onOpenDocPreview}
        accentColor={accentColor}
      />
    </Space>
  );
};
