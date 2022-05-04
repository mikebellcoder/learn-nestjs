import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	NotFoundException,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
	constructor(private readonly coffeesService: CoffeesService) {}

	@Get()
	findAll(@Query() paginationQuery) {
		return this.coffeesService.findAll();
	}

	@Get(':id')
	fineOne(@Param('id') id: number) {
		const coffee = this.coffeesService.findOne(id);
		if (!coffee) {
			throw new NotFoundException(`Coffee #${id} not found`);
		}
		return coffee;
	}

	@Post()
	create(@Body() createCoffeeDto: CreateCoffeeDto) {
		return this.coffeesService.create(createCoffeeDto);
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
		return this.coffeesService.update(id, updateCoffeeDto);
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.coffeesService.remove(id);
	}
}
