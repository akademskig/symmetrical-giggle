import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientsService } from './clients.service';
import { SubmitClientDataInput } from './dtos/submitClientDataInput';
import { Client } from './clients.schema';

@Resolver()
export class ClientsResolver {
  constructor(private clientsService: ClientsService) {}

  @Query(() => String, { name: 'test' })
  async root() {
    return 'test';
  }

  @Mutation(() => Client, { name: 'client' })
  async submitClientData(@Args('input') input: SubmitClientDataInput) {
    return this.clientsService.submitClientData(input);
  }
}
