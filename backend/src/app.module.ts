import { Module } from "@nestjs/common";
import { ControllersModule } from "@infra/http/controllers/controller.module";
import { DatabaseModule } from "@infra/database/database.module";

@Module({
  imports: [DatabaseModule, ControllersModule],
})
export class AppModule {}
