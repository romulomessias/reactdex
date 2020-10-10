import { Test, TestingModule } from '@nestjs/testing';
import { PokmonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

describe('AppController', () => {
  let appController: PokmonController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PokmonController],
      providers: [PokemonService],
    }).compile();

    appController = app.get<PokmonController>(PokmonController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getPokemon()).not.toBeNull();
    });
  });
});
