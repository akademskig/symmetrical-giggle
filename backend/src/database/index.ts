import { MongooseModule } from '@nestjs/mongoose';

const mongooseModule = MongooseModule.forRoot(
  'mongodb://localhost/customer_coverages',
  {
    directConnection: true,
  }
);
export default mongooseModule;
