import {Controller, Get, HttpCode, Post, Req, Res, Param, NotFoundException} from '@nestjs/common';

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
    store(@Req() req, @Res() res) {
        const {id, name, type, avatar} = req.body;
        heroes.push({
            id,
            name,
            type,
            avatar
        })
        res.cookie('name', name)
        return res.status(201).json(heroes)
    }


    @Get('detail/:id')
    show(@Param() params: any) {
        let heroIdx = heroes.findIndex((item) => item.id == params.id)


        if(heroIdx == -1) {
            throw new NotFoundException("Data tidak ditemukan");
        }

        return heroes[heroIdx]
    }

}