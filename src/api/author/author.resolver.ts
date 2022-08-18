import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Mutation(() => Author)
  async createAuthor(@Args('data') data: CreateAuthorInput) {
    return this.authorService.create(data);
  }

  @Query(() => [Author], { name: 'allAuthors' })
  findAll(
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
  ) {
    return this.authorService.findAll(query);
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
