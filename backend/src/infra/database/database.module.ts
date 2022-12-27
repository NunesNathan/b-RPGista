import { Module } from "@nestjs/common";
import { PrismaUserRepository } from "../http/repositories/prisma/prisma-user-repository";
import { UserRepository } from "../http/repositories/user-repository";
import { PrismaService } from "./prisma/prisma.service";

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class DatabaseModule {}
