import { Space, Typography } from "antd";
import { countryCodeToFlagEmoji, formatEventDate } from "../../../shared/utils";
import type { ICompany, ICompanyEvent } from "../types";

type PopoverMetaProps = { 
  company: ICompany; 
  latestEvent: ICompanyEvent | null 
};

export const PopoverMeta = (props: PopoverMetaProps) => {
  const latestEventDate = props.latestEvent?.eventDate ? formatEventDate(props.latestEvent.eventDate) : "";
  const latestEventTitle = props.latestEvent?.eventTitle || "";

  return (
    <Space size={6} wrap>
      <Typography.Text type="secondary">
        {countryCodeToFlagEmoji(props.company.companyCountry)} {props.company.companyCountry}
      </Typography.Text>
      <Typography.Text type="secondary">·</Typography.Text>
      <Typography.Text type="secondary">{props.company.companyTicker}</Typography.Text>
      <Typography.Text type="secondary">·</Typography.Text>
      <Typography.Text type="secondary">{props.company.reportingCurrency}</Typography.Text>
      {latestEventDate ? (
        <>
          <Typography.Text type="secondary">·</Typography.Text>
          <Typography.Text type="secondary">
            Latest event{latestEventTitle ? `: ${latestEventTitle}` : ""} ({latestEventDate})
          </Typography.Text>
        </>
      ) : null}
    </Space>
  );
};
