import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

const mongooseModule = MongooseModule.forRootAsync({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
  useFactory: async (config: ConfigService) => {
    return {
      uri: `mongodb://${config.get('DB_HOST')}/customer_coverages`,
      directConnection: true,
    };
  },
  inject: [ConfigService],
});
export default mongooseModule;
