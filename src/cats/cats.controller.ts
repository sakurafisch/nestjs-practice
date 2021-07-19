import {
  Controller,
  Get,
  Post,
  Header,
  Param,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  HttpStatus,
  ParseUUIDPipe,
  UsePipes,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';
import { JoiValidationPipe } from 'src/common/pipe/joi-validation.pipe';
import { ValidationPipe } from 'src/common/pipe/validation.pipe';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Header('Cache-Control', 'none')
  create(@Body(new ValidationPipe()) createCatDto: CreateCatDto): void {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll(): Observable<Cat[]> {
    return of(this.catsService.findAll());
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) uuid: string) {
    return `This action removes a #${uuid} cat`;
  }
}
