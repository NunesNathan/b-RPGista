import { Injectable } from "@nestjs/common";
import { User } from "@application/entities/user";
import { PrismaUserMapper } from "@infra/database/prisma/mappers/prisma-users-mapper";
import { PrismaService } from "@infra/database/prisma/prisma.service";
import { UserRepository } from "../user-repository";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  async findMany(): Promise<User[]> {
    const rawUsers = await this.prisma.user.findMany({});

    return rawUsers.map((user) => PrismaUserMapper.toDomain(user));
  }

  async create(user: User): Promise<User> {
    const rawUser = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: rawUser,
    });

    return PrismaUserMapper.toDomain(rawUser);
  }
}