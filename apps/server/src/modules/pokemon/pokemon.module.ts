import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokmonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
console.log(join(__dirname, '../../', 'resources'));
console.log(join(__dirname, '.', 'resources'));
@Module({
  controllers: [PokmonController],
  providers: [PokemonService],
})
export class PokemonModule {}
