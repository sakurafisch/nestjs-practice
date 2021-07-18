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
import { CreateCatDto } from './create-cat.dto';
import { UpdateCatDto } from './update-cat.dto';

@Controller('cats')
export class CatsController {
  @Post()
  @Header('Cache-Control', 'none')
  create(@Body() createCatDto: CreateCatDto): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): Observable<string> {
    return of('This action returns all cats');
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
