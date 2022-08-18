import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBookInput) {
    return this.prisma.book.create({
      data: {
        title: data.title,
        isbn: data.isbn,
        description: data.description,
        author: data.author,
        publishedYear: data.publishedYear,
        publisher: data.publisher,
      },
    });
  }

  async findAll(params) {
    try {
      const { query, orderBy, after, before, first, last } = params;
      const filter: any = {
        where: {
          deleted: false,
        },
        orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
      };
      params.skip && (filter.skip = params.skip);
      params.take && (filter.take = params.take);
      params.publishedYear &&
        (filter.where.publishedYear = params.publishedYear);
      params.query && (filter.where.title = { contains: query });
      params.query &&
        (filter.where.OR = [
          { title: { contains: query } },
          { author: { contains: query } },
          { publisher: { contains: query } },
        ]);
      return findManyCursorConnection(
        (args) => this.prisma.book.findMany({ ...args, ...filter }),
        () => this.prisma.book.count({ where: filter.where }),
        { first, last, before, after },
      );
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findOne(id: string) {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  async update(data: UpdateBookInput) {
    return this.prisma.book.update({
      data: {
        title: data.title,
        isbn: data.isbn,
        description: data.description,
        author: data.author,
        publishedYear: data.publishedYear,
        publisher: data.publisher,
      },
      where: { id: data.id },
    });
  }

  async remove(id: string) {
    return this.prisma.book.update({ where: { id }, data: { deleted: true } });
  }

  async drop(id: string) {
    return this.prisma.book.delete({ where: { id } });
  }
}
