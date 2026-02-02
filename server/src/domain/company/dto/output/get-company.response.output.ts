import { ApiProperty } from '@nestjs/swagger';
import { CompanyResponseOutput } from './company.response.output';

export class CompanyListMetaOutput {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  totalPages: number;
}

export class GetCompanyResponseOutput {
  @ApiProperty({ type: () => [CompanyResponseOutput] })
  data: CompanyResponseOutput[];

  @ApiProperty({ type: () => CompanyListMetaOutput })
  meta: CompanyListMetaOutput;
}
