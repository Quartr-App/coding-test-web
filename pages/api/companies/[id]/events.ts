import { NextApiRequest, NextApiResponse } from "next";
import { data } from "../../companies";

export type CompanyEvent = {
  audioUrl?: string | null;
  reportUrl: string;
  pdfUrl: string | null;
  eventId: number;
  eventTitle: string;
  eventDate: string;
  qnaTimestamp: number | null;
  fiscalPeriod: string;
  fiscalYear: string;
};

export default function GET(req: NextApiRequest, res: NextApiResponse<any>) {
  const { id } = req.query;
  if (!id || Array.isArray(id) || isNaN(Number(id))) {
    res.status(400).json({ error: "Invalid company ID" });
    return;
  }
  const company = data.data.find((c) => c.companyId === Number(id));
  if (!company) {
    res.status(404).json({ error: "Company not found" });
    return;
  }

  res.status(200).json({ data: company.events });
}
