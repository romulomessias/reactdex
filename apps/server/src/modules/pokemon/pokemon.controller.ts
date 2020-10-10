import { Controller, Get, Header, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { readFileSync } from 'fs';
import { join } from 'path';
// import pokemon from './resources/pokemon/pokemon.json';

@Controller('/pokemon')
export class PokmonController {
  constructor(private readonly appService: PokemonService) {}

  @Get()
  @Header('content-type', 'application/json')
  @Header('transfer-encoding', 'chunked')
  getPokemon() {
    console.log("hello")
    const path = join(__dirname, '../../../', 'resources/pokemon/pokemon.json');
    return readFileSync(path, 'utf8');
  }

  @Get(':number')
  @Header('content-type', 'application/json')
  getPokemonByNumber(@Param('number') number) {
    const path = join(__dirname, '../../../', 'resources/pokemon/pokemon.json');
    return readFileSync(path, 'utf8');
  }
}
