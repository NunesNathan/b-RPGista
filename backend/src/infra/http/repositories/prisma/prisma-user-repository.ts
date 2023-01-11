import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Favorites } from "@application/entities/user/favorites";
import { User } from "@application/entities/user/user";
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

  async find(id: string): Promise<User | null> {
    const findedUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (findedUser) {
      return PrismaUserMapper.toDomain(findedUser);
    }

    return null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const findedUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (findedUser) {
      return PrismaUserMapper.toDomain(findedUser);
    }

    return null;
  }

  async findFavorites(id: string): Promise<Favorites | null> {
    const findedUserFavorites = await this.prisma.user.findUnique({
      where: { id },
      select: {
        favorites: true,
      },
    });

    if (findedUserFavorites) {
      return PrismaUserMapper.toDomainFavorite(findedUserFavorites);
    }

    return null;
  }

  async create(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: data as Prisma.UserCreateInput,
    });

    return PrismaUserMapper.toDomain(data);
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: PrismaUserMapper.toPrisma(user) as Prisma.UserUpdateInput,
    });

    return PrismaUserMapper.toDomain(updatedUser);
  }

  async delete(email: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        email,
      },
    });
  }
}
