import { MongooseModule } from '@nestjs/mongoose';

const mongooseModule = MongooseModule.forRoot(
  'mongodb://localhost/client_coverages',
  {
    directConnection: true,
  },
);
export default mongooseModule;
