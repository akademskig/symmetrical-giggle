import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Cart } from 'src/customer/customer.schema';
import { ToggleProductInput } from './dtos/toggleProductInput';
import { CartService } from './cart.service';

@Resolver()
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Mutation(() => Cart, { name: 'cart' })
  async toggleProduct(@Args('input') input: ToggleProductInput) {
    const c = await this.cartService.toggleProduct(input);
    return c.cart;
  }
}
