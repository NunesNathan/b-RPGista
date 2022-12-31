import { Module } from "@nestjs/common";
import { DatabaseModule } from "@infra/database/database.module";
import { ControllersModule } from "@infra/http/controllers/controller.module";

@Module({
  imports: [DatabaseModule, ControllersModule],
})
export class AppModule {}
