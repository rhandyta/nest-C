import { Injectable, NotFoundException } from '@nestjs/common';
import { Hero } from './hero.interface';

@Injectable()
export class HeroService {
  private readonly heroes: Hero[] = [
    {
      id: 1,
      name: 'Akai Wil',
      type: 'Tank',
      avatar: 'akai.jpg',
    },
    {
      id: 2,
      name: 'Lancelot',
      type: 'Assassin',
      avatar: 'lancelot.jpg',
    },
    {
      id: 3,
      name: 'Miya',
      type: 'Markmans',
      avatar: 'miya.jpg',
    },
  ];

  index(): Hero[] {
    return this.heroes;
  }

  create(): string {
    return 'Hero Page Created Loaded';
  }

  store(hero: any) {
    const { id, name, type, avatar } = hero;
    this.heroes.push({
      id,
      name,
      type,
      avatar,
    });
    return hero;
  }

  update(id: number, hero: any) : Hero {
    const heroIdx = this.getById(id);

    this.heroes[heroIdx].name = hero.name;
    this.heroes[heroIdx].type = hero.type;
    this.heroes[heroIdx].avatar = hero.avatar;
    return this.heroes[heroIdx];
  }

  destroy(id: number): void {
    const heroIdx = this.getById(id);

    this.heroes.splice(heroIdx, 1);
  }

  show(id: number) {
    let heroIdx = this.getById(id);

    return this.heroes[heroIdx];
  }

  getById(id: number) {
    const heroIdx = this.heroes.findIndex((hero) => hero.id == id);

    if (heroIdx == -1) {
      throw new NotFoundException('Data tidak ditemukan');
    }

    return heroIdx;
  }
}
