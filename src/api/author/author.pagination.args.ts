import { ArgsType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/pagination/pagination.args';

@ArgsType()
export class AuthorPaginationArgs extends PaginationArgs {
  email?: string;
}
