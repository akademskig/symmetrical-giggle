import { Injectable } from '@nestjs/common';
import { Customer } from './customer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubmitCustomerDataInput } from './dtos/submitCustomerDataInput';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    private cartService: CartService
  ) {}

  async update(input: SubmitCustomerDataInput) {
    const { name, ...rest } = input;
    return this.customerModel.findOneAndUpdate({ name }, { ...rest });
  }
  async createNew(input: SubmitCustomerDataInput) {
    const customer = new this.customerModel(input);
    return customer.save();
  }
  async submitCustomerData(input: SubmitCustomerDataInput) {
    const existing = await this.customerModel.findOne({
      name: input.name,
    });
    const c = existing ? await this.update(input) : await this.createNew(input);

    await this.cartService.updateSelectedProducts({ customerId: c._id });
    const customer = await this.customerModel.findOne({
      name: input.name,
    });
    return customer;
  }
}
