import {Controller, Get, HttpCode, Post, Req, Res, Param, NotFoundException, Body, Patch, Delete} from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { HeroService } from './hero.service';


@Controller("hero")
export class HeroController {

    constructor(private heroService: HeroService)
    {}

    @Get('')
    @HttpCode(200)
    index(){
        return this.heroService.index();
    }

    @Get('create')
    @HttpCode(200)
    create(@Res({passthrough: true}) response): string {
        response.cookie('name', 'kuy1');
        return  this.heroService.create();
    }

    @Post('create')
    store(@Body() createHeroDto: CreateHeroDto, @Res() res) {
        const data = this.heroService.store(createHeroDto);
        res.cookie('name', createHeroDto.name)
        return res.status(201).json(data)
    }

    @Patch('update/:id')
    update(@Param('id') id: number, @Body() updateHeroDto: UpdateHeroDto) {
        
        const data = this.heroService.update(id, updateHeroDto);

        return data;
    }

    @Delete(':id')
    @HttpCode(200)
    destroy(@Param('id') id: number, @Res() res) {
        
        this.heroService.destroy(id);

        return res.json({
            message: "Data has been deleted"
        });
    }


    @Get('detail/:id')
    show(@Param('id') id: number) {
      
        const data = this.heroService.show(id);

        return data;
    }

}