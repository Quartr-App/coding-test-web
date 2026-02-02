import { Divider, Flex, Modal, Typography } from "antd";
import { getEventDocs, getSafeBrandColor } from "../../../shared/utils";
import styles from "../styles/CompanyPopover.module.css";
import type { ICompany, ICompanyEvent } from "../types";
import { DocsSectionPopover } from "./DocsSectionPopover";
import { HeaderModal } from "./HeaderModal";
import { PopoverFooterLinks } from "./PopoverFooterLinks";
import { PopoverMeta } from "./PopoverMeta";

type CompanyPopoverProps = {
  company: ICompany;
  latestEvent: ICompanyEvent | null;
  onClose: () => void;
  onOpenAllEvents: () => void;
  onOpenDocPreview: (url: string, title: string) => void;
}

export const CompanyPopover = (props: CompanyPopoverProps) => {
  const docs = getEventDocs(props.latestEvent);

  const title = props.company.displayName || props.company.companyName;
  const brand = props.company.brandColor ?? "";
  const brandColor = getSafeBrandColor(brand);

  return (
    <Modal
      open
      onCancel={props.onClose}
      closable={false}
      footer={null}
      title={
        <HeaderModal
          title={title}
          brandColor={brandColor}
          onClose={props.onClose}
        />
      }
      width={560}
    >
      <Flex vertical gap={16}>
        <PopoverMeta company={props.company} latestEvent={props.latestEvent} />

        {props.company.description && (
          <Typography.Paragraph
            type="secondary"
            className={styles.description}
          >
            {props.company.description}
          </Typography.Paragraph>
        )}

        <DocsSectionPopover
          company={props.company}
          docs={docs}
          onOpenAllEvents={props.onOpenAllEvents}
          onOpenDocPreview={props.onOpenDocPreview}
        />

        <Divider className={styles.divider} />
        <Flex align="center" justify="space-between">
          <Typography.Text type="secondary" className={styles.linksLabel}>
            Links
          </Typography.Text>
          <PopoverFooterLinks company={props.company} />
        </Flex>
      </Flex>
    </Modal>
  );
};
