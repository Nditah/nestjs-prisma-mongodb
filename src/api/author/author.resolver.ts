import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { AuthorPaginationArgs as PaginationArgs } from './author.pagination.args';
import { AuthorRecordOrder as RecordOrder } from './inputs/record-order.input';
import { AuthorConnection } from './entities/author-connection.entity';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Mutation(() => Author)
  async createAuthor(@Args('data') data: CreateAuthorInput) {
    return this.authorService.create(data);
  }

  @Query(() => AuthorConnection, { name: 'allAuthors' })
  findAll(
    @Args()
    { skip, take, after, before, first, last, email }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => RecordOrder,
      nullable: true,
    })
    orderBy: RecordOrder,
  ) {
    const params = {
      query,
      orderBy,
      skip,
      take,
      after,
      before,
      first,
      last,
      email,
    };
    return this.authorService.findAll(params);
  }

  @Query(() => Author, { name: 'oneAuthor' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.authorService.findOne(id);
  }

  @Mutation(() => Author)
  updateAuthor(@Args('data') data: UpdateAuthorInput) {
    return this.authorService.update(data);
  }

  @Mutation(() => Author)
  removeAuthor(@Args('id', { type: () => String }) id: string) {
    return this.authorService.remove(id);
  }

  @Mutation(() => Author)
  dropAuthor(@Args('id', { type: () => String }) id: string) {
    return this.authorService.drop(id);
  }
}
