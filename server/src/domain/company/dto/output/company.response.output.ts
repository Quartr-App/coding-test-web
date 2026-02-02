import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { EventResponseOutput } from './event.response.output';

export class CompanyResponseOutput {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ description: 'External company id (numeric)' })
  companyId: number;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  companyCountry: string;

  @ApiPropertyOptional({ nullable: true })
  companyTicker: string | null;

  @ApiProperty()
  displayName: string;

  @ApiPropertyOptional({ nullable: true })
  infoUrl: string | null;

  @ApiPropertyOptional({ nullable: true })
  liveUrl: string | null;

  @ApiPropertyOptional({ nullable: true })
  logoLightUrl: string | null;

  @ApiPropertyOptional({ nullable: true })
  logoDarkUrl: string | null;

  @ApiPropertyOptional({ nullable: true })
  iconUrl: string | null;

  @ApiPropertyOptional({ nullable: true })
  description: string | null;

  @ApiPropertyOptional({ nullable: true })
  reportingCurrency: string | null;

  @ApiPropertyOptional({ nullable: true })
  brandColor: string | null;

  @ApiProperty({ type: [String] })
  isins: string[];

  @ApiProperty({ type: () => [EventResponseOutput] })
  events: EventResponseOutput[];
}
