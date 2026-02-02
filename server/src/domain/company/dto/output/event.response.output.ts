import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EventResponseOutput {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ description: 'External event id (numeric)' })
  eventId: number;

  @ApiProperty()
  eventTitle: string;

  @ApiProperty()
  eventDate: Date;

  @ApiPropertyOptional()
  reportUrl: string | null;

  @ApiPropertyOptional()
  pdfUrl: string | null;

  @ApiPropertyOptional()
  audioUrl: string | null;

  @ApiPropertyOptional({ nullable: true })
  qnaTimestamp: number | null;

  @ApiPropertyOptional({ nullable: true })
  fiscalPeriod: string | null;

  @ApiPropertyOptional({ nullable: true })
  fiscalYear: string | null;
}
