import { Button, Flex, Typography } from "antd";
import type { CSSProperties } from "react";
import styles from "../styles/DocsRow.module.css";
import type { IEventDocs } from "../types";

type DocsAction = { label: string; href: string };

type DocsRowProps = {
  companyName: string;
  docs: IEventDocs;
  onOpenDocPreview: (url: string, title: string) => void;
  accentColor?: string;
  variant?: "default" | "compact";
};
const getDocsActions = (docs: IEventDocs): DocsAction[] =>
  [
    docs.reportUrl ? { label: "Open report", href: docs.reportUrl } : null,
    docs.pdfUrl ? { label: "Open PDF", href: docs.pdfUrl } : null,
    docs.audioUrl ? { label: "Audio", href: docs.audioUrl } : null,
  ].filter((item): item is DocsAction => item !== null);

const DocsActions = (props: { actions: DocsAction[] }) => {
  if (props.actions.length === 0) return null;

  return (
    <Flex gap="middle" wrap className={styles.actions}>
      {props.actions.map((action) => (
        <Button
          key={action.href}
          size="small"
          variant="outlined"
          href={action.href}
          target="_blank"
          rel="noreferrer"
          className={`${styles.actionBtn} ${styles.outlineAccent}`}
        >
          {action.label}
        </Button>
      ))}
    </Flex>
  );
};

export const DocsRow = (props: DocsRowProps) => {
  if (!props.docs.reportUrl && !props.docs.pdfUrl && !props.docs.audioUrl) return null;

  const variant = props.variant ?? "default";
  const isCompact = variant === "compact";

  const accentColor = props.accentColor;
  const styleVars = accentColor ? ({ "--accent": accentColor } as CSSProperties) : undefined;
  const actions = getDocsActions(props.docs);

  return (
    <Flex vertical gap={8} className={styles.root} style={styleVars}>
      {props.docs.pdfUrl ? (
        <Button
          onClick={() =>
            props.onOpenDocPreview(props.docs.pdfUrl!, `${props.companyName} — ${props.docs.label}`)
          }
          className={`${styles.previewBtn} ${styles.outlineAccent} ${
            isCompact ? styles.previewCompact : styles.previewDefault
          }`}
        >
          <Flex align="center" gap={isCompact ? 10 : 12} className={styles.previewInner}>
            <span
              aria-hidden="true"
              className={`${styles.thumbnail} ${isCompact ? styles.thumbnailCompact : styles.thumbnailDefault}`}
            >
              <iframe
                className={styles.iframe}
                src={`${props.docs.pdfUrl}#page=1&zoom=page-width`}
                title="PDF cover thumbnail"
                loading="lazy"
              />
            </span>

            <Flex vertical gap={2} className={styles.previewText}>
              <Typography.Text
                strong
                className={isCompact ? styles.previewTitleCompact : undefined}
              >
                Preview PDF
              </Typography.Text>
              <Typography.Text
                type="secondary"
                className={isCompact ? styles.previewLabelCompact : styles.previewLabelDefault}
              >
                {props.docs.label}
              </Typography.Text>
            </Flex>
          </Flex>
        </Button>
      ) : null}

      <DocsActions actions={actions} />
    </Flex>
  );
};
