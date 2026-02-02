import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetCompanyInput } from '../dto/input/get-company.input';
import { GetCompanyResponseOutput } from '../dto/output';
import { CompanyService } from '../services/company.service';

@ApiTags('Company APIs')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('/')
  @ApiOkResponse({
    description: 'Trending Companies fetched successfully!',
    type: GetCompanyResponseOutput,
  })
  async getCompany(
    @Query() input: GetCompanyInput,
  ): Promise<GetCompanyResponseOutput> {
    const result = await this.companyService.getCompany(input);

    return result;
  }
}
