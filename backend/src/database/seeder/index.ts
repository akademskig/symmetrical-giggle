import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';
import { Logger } from '@nestjs/common';
import { exit } from 'process';

const init = async () => {
  const seeder = await NestFactory.createApplicationContext(SeederModule);
  const seederService = seeder.get(SeederService);
  try {
    await seederService.clearDb();
    await seederService.seedDb();
    Logger.log('DONE', 'SeederService');
  } catch (error) {
    Logger.error(error.message, 'SeederService');
  } finally {
    exit(0);
  }
};
export { init as seedDb };
export default init();
