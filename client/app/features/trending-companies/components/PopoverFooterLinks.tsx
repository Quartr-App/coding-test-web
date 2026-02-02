import { Button, Space, Typography } from "antd";
import type { ICompany } from "../types";

type PopoverFooterLinksProps = { company: ICompany };

export const PopoverFooterLinks = (props: PopoverFooterLinksProps) => {
  return (
    <Space size={6} wrap>
      <Button type="link" size="small" href={props.company.infoUrl} target="_blank" rel="noreferrer">
        Company info
      </Button>
      <Typography.Text type="secondary">·</Typography.Text>
      <Button type="link" size="small" href={props.company.liveUrl} target="_blank" rel="noreferrer">
        Investor page
      </Button>
    </Space>
  );
};
