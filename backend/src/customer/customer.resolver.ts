import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { SubmitCustomerDataInput } from './dtos/submitCustomerDataInput';
import { Customer } from './customer.schema';

@Resolver()
export class CustomerResolver {
  constructor(private customerService: CustomerService) {}

  @Query(() => String, { name: 'test' })
  async root() {
    return 'test';
  }

  @Mutation(() => Customer, { name: 'customer' })
  async submitCustomerData(@Args('input') input: SubmitCustomerDataInput) {
    return this.customerService.submitCustomerData(input);
  }
}
