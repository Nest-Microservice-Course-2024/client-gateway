import { Module } from '@nestjs/common';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';

import { envs, PRODUCT_SERVICE } from 'src/config';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.productsMicroserviceHost,
          port: envs.productsMicroservicePort
        }
      }
    ])
  ]
})
export class ProductsModule {}
