import type { NextApiRequest, NextApiResponse } from 'next';
import { data } from '../constants/companyData';
import { Company } from '../../../types/company';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Company ID is required' });
  }
  const companyId = Number(id);
  if (Number.isNaN(companyId)) {
    return res.status(400).json({ error: 'Company ID must be a number' });
  }
  const company = data.data.find(
    (company: Company) => company.companyId === companyId,
  );
  if (!company) {
    return res.status(404).json({ error: 'Company not found' });
  }
  res.status(200).json(company);
}
