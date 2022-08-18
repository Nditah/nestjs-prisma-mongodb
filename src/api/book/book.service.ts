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
        author: data.author && { connect: { id: data.author } },
        publishedYear: data.publishedYear,
        publisher: data.publisher,
      },
    });
  }

  async findAll(query?) {
    const filter: any = {
      where: {
        deleted: false,
      },
    };
    query && (filter.where.title = { contains: query });
    query &&
      (filter.where.OR = [
        { title: { contains: query } },
        { publisher: { contains: query } },
      ]);
    return this.prisma.book.findMany({ ...filter });
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
        author: data.author && { connect: { id: data.author } },
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
