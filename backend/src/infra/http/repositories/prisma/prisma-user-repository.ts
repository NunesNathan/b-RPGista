import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { User } from "@application/entities/user";
import { PrismaUserMapper } from "@infra/database/prisma/mappers/prisma-users-mapper";
import { PrismaService } from "@infra/database/prisma/prisma.service";
import { UserRepository } from "../user-repository";
import { Favorites } from "@application/entities/favorites";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async update(user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: PrismaUserMapper.toPrisma(user) as Prisma.UserUpdateInput,
    });

    return PrismaUserMapper.toDomain(updatedUser);
  }

  async find(id: string): Promise<User> {
    return PrismaUserMapper.toDomain(
      await this.prisma.user.findUniqueOrThrow({
        where: { id },
      }),
    );
  }

  async findMany(): Promise<User[]> {
    const rawUsers = await this.prisma.user.findMany({});

    return rawUsers.map((user) => PrismaUserMapper.toDomain(user));
  }

  async create(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: data as Prisma.UserCreateInput,
    });

    return PrismaUserMapper.toDomain(data);
  }

  async findFavorites(id: string): Promise<Favorites> {
    return PrismaUserMapper.toDomainFavorite(
      await this.prisma.user.findUniqueOrThrow({
        where: { id },
        select: {
          favorites: true,
        },
      }),
    );
  }
}
