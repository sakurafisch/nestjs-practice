import {
  Controller,
  Get,
  Post,
  Header,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Header('Cache-Control', 'none')
  create(@Body() createCatDto: CreateCatDto): void {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll(): Observable<Cat[]> {
    return of(this.catsService.findAll());
  }

  @Get(':id')
  findOne(@Param('id') id): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
