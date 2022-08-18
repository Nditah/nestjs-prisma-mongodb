import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  skip?: number;

  take?: number;

  after?: string;

  before?: string;

  first?: number;

  last?: number;
}
