import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.enableCors();


  // ... Other app setup code ...

  const seedService = app.get(SeedService);
  await seedService.seedFournisseurTable(); // Call the seed method
  await seedService.seedCompetencesTable(); // Call the seed method
  // await seedService.seedCommandeTable(); // Call the seed method

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
