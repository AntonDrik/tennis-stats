import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { CreateSeasonDto, ExtendSeasonDto } from '@tennis-stats/dto';
import { Season } from '@tennis-stats/entities';
import { EPermission, ISeasonWithStats } from '@tennis-stats/types';
import { Permissions } from '../../../auth/decorators';
import { IdParam } from '../../../common/decorators';
import SeasonsService from '../services/seasons.service';

@Controller('seasons')
class SeasonsController {
  constructor(private seasonsService: SeasonsService) {}

  @Get()
  getSeasons(): Promise<ISeasonWithStats[]> {
    return this.seasonsService.getSeasons();
  }

  @Get('/active')
  getActiveSeason(): Promise<Season | null> {
    return this.seasonsService.getActiveSeason();
  }

  @Get('/last-finished')
  getLastFinishedSeason(): Promise<Season | null> {
    return this.seasonsService.getLastFinishedSeason();
  }

  @Post()
  @Permissions([EPermission.SEASONS_CRUD])
  async createSeason(@Body() dto: CreateSeasonDto): Promise<void> {
    await this.seasonsService.createSeason(dto);
  }

  @Put('/:id/extend')
  @Permissions([EPermission.SEASONS_CRUD])
  async extendSeason(@IdParam() id: number, @Body() dto: ExtendSeasonDto): Promise<void> {
    await this.seasonsService.extendSeason(id, dto);
  }

  @Patch('/:id')
  @Permissions([EPermission.SEASONS_CRUD])
  async finishSeason(@IdParam() id: number) {
    await this.seasonsService.finishSeason(id);
  }

  @Delete('/:id')
  @Permissions([EPermission.SEASONS_CRUD])
  async deleteSeason(@IdParam() id: number): Promise<void> {
    await this.seasonsService.deleteSeason(id);
  }
}

export default SeasonsController;
