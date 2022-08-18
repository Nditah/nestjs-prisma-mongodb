import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAuthorInput) {
    return this.prisma.author.create({
      data: {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
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
      params.email && (filter.where.email = params.email);
      params.query && (filter.where.title = { contains: query });
      params.query &&
        (filter.where.OR = [
          { title: { contains: query } },
          { author: { contains: query } },
          { publisher: { contains: query } },
        ]);
      return findManyCursorConnection(
        (args) => this.prisma.author.findMany({ ...args, ...filter }),
        () => this.prisma.author.count({ where: filter.where }),
        { first, last, before, after },
      );
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findOne(id: string) {
    return this.prisma.author.findUnique({
      where: { id },
    });
  }

  async update(data: UpdateAuthorInput) {
    return this.prisma.author.update({
      data: {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      },
      where: { id: data.id },
    });
  }

  async remove(id: string) {
    return this.prisma.author.update({
      where: { id },
      data: { deleted: true },
    });
  }

  async drop(id: string) {
    return this.prisma.author.delete({ where: { id } });
  }
}
