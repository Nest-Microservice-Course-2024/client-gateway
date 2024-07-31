import { Module } from '@nestjs/common';

import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './transports/nats.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, OrdersModule, NatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
