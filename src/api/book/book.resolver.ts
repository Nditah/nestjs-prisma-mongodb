import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  async createBook(@Args('data') data: CreateBookInput) {
    return this.bookService.create(data);
  }

  @Query(() => [Book], { name: 'allBooks' })
  findAll(
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
  ) {
    return this.bookService.findAll(query);
  }

  @Query(() => Book, { name: 'oneBook' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book)
  updateBook(@Args('data') data: UpdateBookInput) {
    return this.bookService.update(data);
  }

  @Mutation(() => Book)
  removeBook(@Args('id', { type: () => String }) id: string) {
    return this.bookService.remove(id);
  }

  @Mutation(() => Book)
  dropBook(@Args('id', { type: () => String }) id: string) {
    return this.bookService.drop(id);
  }
}
