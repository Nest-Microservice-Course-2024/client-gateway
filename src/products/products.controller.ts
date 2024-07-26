import { catchError, firstValueFrom } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';

import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({ cmd: 'create' }, createProductDto);
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all' }, paginationDto)
  }

  @Get(':id')
  async findProduct(@Param('id') id: string) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one' }, { id })
      )
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'delete' }, { id }).pipe(
      catchError(err => { throw new RpcException(err)})
    )
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsClient.send({ cmd: 'update' },{
      id,
      ...updateProductDto
    }).pipe(
      catchError(err => { throw new RpcException(err)})
    )
  }
}
