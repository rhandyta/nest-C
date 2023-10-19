import {Controller, Get, HttpCode, Post, Req, Res, Param, NotFoundException, Body, Patch, Delete} from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

const heroes = [
    {
        id: 1,
        name: "Akai Wil",
        type: "Tank",
        avatar: "akai.jpg"
    },
    {
        id: 2,
        name: "Lancelot",
        type: "Assassin",
        avatar: "lancelot.jpg"
    },
    {
        id: 3,
        name: "Miya",
        type: "Markmans",
        avatar: "miya.jpg"
    },
]


@Controller("hero")
export class HeroController {

    @Get('')
    @HttpCode(200)
    index(@Res() response){
        return response.json(heroes);
    }

    @Get('create')
    @HttpCode(202)
    create(@Res({passthrough: true}) response): string {
        response.cookie('name', 'kuy1');
        return 'hero created';
    }

    @Post('create')
    store(@Body() createHeroDto: CreateHeroDto, @Res() res) {
        const {id, name, type, avatar} = createHeroDto;
        heroes.push({ 
            id,
            name,
            type,
            avatar
        })
        res.cookie('name', name)
        return res.status(201).json(createHeroDto)
    }

    @Patch('update/:id')
    update(@Param('id') id: number, @Body() updateHeroDto: UpdateHeroDto) {
        const heroIdx = this.getById(id);

        heroes[heroIdx].name = updateHeroDto.name
        heroes[heroIdx].type = updateHeroDto.type
        heroes[heroIdx].avatar = updateHeroDto.avatar
        return heroes
    }

    @Delete(':id')
    destroy(@Param('id') id: number) {
        const heroIdx = this.getById(id)

        heroes.splice(heroIdx, 1);

        return heroes;

    }


    @Get('detail/:id')
    show(@Param('id') id: number) {
        let heroIdx = this.getById(id)

        return heroes[heroIdx]
    }

    getById(id: number) {
        const heroIdx = heroes.findIndex((hero) => hero.id == id);

        
        if(heroIdx == -1) {
            throw new NotFoundException("Data tidak ditemukan");
        }

        return heroIdx;
    }

}