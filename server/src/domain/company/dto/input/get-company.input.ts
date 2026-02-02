import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsISO31661Alpha2,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class GetCompanyInput {
  @ApiPropertyOptional({
    description: 'Filter by external companyId (numeric)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  companyId?: number;

  @ApiPropertyOptional({ description: 'Filter by company ticker (e.g. OKEA)' })
  @IsOptional()
  @IsString()
  @Length(1, 10)
  @Matches(/^[A-Z]+$/, {
    message: 'companyTicker must be uppercase letters only',
  })
  companyTicker?: string;

  @ApiPropertyOptional({
    description: 'Filter by company countryCode (ISO 3166-1 alpha-2, e.g. NO)',
  })
  @IsOptional()
  @IsString()
  @IsISO31661Alpha2()
  country?: string;

  @ApiPropertyOptional({ description: 'Pagination page' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ description: 'Pagination limit' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
}
