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

  async findAll(query?) {
    const filter: any = {
      where: {
        deleted: false,
      },
    };
    query && (filter.where.title = { contains: query });
    query &&
      (filter.where.OR = [
        { firstName: { contains: query } },
        { email: { contains: query } },
      ]);
    return this.prisma.book.findMany({ ...filter });
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
