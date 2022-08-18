import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';

@Module({
  imports: [],
  providers: [AuthorResolver, AuthorService],
})
export class AuthorModule {}
