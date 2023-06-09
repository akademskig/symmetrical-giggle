import { Resolver, Args, Query } from '@nestjs/graphql';
import { GetAvailableProductsInput } from './dtos/getAvailableProducts.input';
import { ProductsService } from './products.service';
import { GetAvailableProductsResponse } from './dtos/getAvailableProducts.response';

@Resolver()
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [GetAvailableProductsResponse], { name: 'products' })
  async getAvailableProducts(@Args('input') data: GetAvailableProductsInput) {
    return this.productsService.getAvailableProducts(data);
  }
}
