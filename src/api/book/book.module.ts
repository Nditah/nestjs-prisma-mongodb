import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';

@Module({
  imports: [],
  providers: [BookResolver, BookService],
})
export class BookModule {}
