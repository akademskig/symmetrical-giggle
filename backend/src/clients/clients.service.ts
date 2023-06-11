import { Injectable } from '@nestjs/common';
import { Client } from './clients.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubmitClientDataInput } from './dtos/submitClientDataInput';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<Client>,
    private cartService: CartService
  ) {}

  async update(input: SubmitClientDataInput) {
    const { name, ...rest } = input;
    return this.clientModel.findOneAndUpdate({ name }, { ...rest });
  }
  async createNew(input: SubmitClientDataInput) {
    const client = new this.clientModel(input);
    return client.save();
  }
  async submitClientData(input: SubmitClientDataInput) {
    const existing = await this.clientModel.findOne({
      name: input.name,
    });
    const c = existing ? await this.update(input) : await this.createNew(input);

    await this.cartService.updateSelectedProducts({ clientId: c._id });
    const client = await this.clientModel.findOne({
      name: input.name,
    });
    return client;
  }
}
