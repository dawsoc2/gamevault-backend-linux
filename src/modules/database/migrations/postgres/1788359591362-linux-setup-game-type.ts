import { MigrationInterface, type QueryRunner } from "typeorm";

export class LinuxSetupGameType1788359591362 implements MigrationInterface {
  name = "LinuxSetupGameType1788359591362";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TYPE "public"."gamevault_game_type_enum"
            RENAME TO "gamevault_game_type_enum_old"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."gamevault_game_type_enum" AS ENUM(
                'UNDETECTABLE',
                'WINDOWS_SETUP',
                'WINDOWS_PORTABLE',
                'WINDOWS_SOFTWARE',
                'LINUX_PORTABLE',
                'LINUX_SOFTWARE',
                'LINUX_SETUP'
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "gamevault_game"
            ALTER COLUMN "type" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TABLE "gamevault_game"
            ALTER COLUMN "type" TYPE "public"."gamevault_game_type_enum" USING "type"::"text"::"public"."gamevault_game_type_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "gamevault_game"
            ALTER COLUMN "type"
            SET DEFAULT 'UNDETECTABLE'
        `);
    await queryRunner.query(`
            DROP TYPE "public"."gamevault_game_type_enum_old"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."gamevault_game_type_enum_old" AS ENUM(
                'UNDETECTABLE',
                'WINDOWS_SETUP',
                'WINDOWS_PORTABLE',
                'LINUX_PORTABLE'
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "gamevault_game"
            ALTER COLUMN "type" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TABLE "gamevault_game"
            ALTER COLUMN "type" TYPE "public"."gamevault_game_type_enum_old" USING "type"::"text"::"public"."gamevault_game_type_enum_old"
        `);
    await queryRunner.query(`
            ALTER TABLE "gamevault_game"
            ALTER COLUMN "type"
            SET DEFAULT 'UNDETECTABLE'
        `);
    await queryRunner.query(`
            DROP TYPE "public"."gamevault_game_type_enum"
        `);
    await queryRunner.query(`
            ALTER TYPE "public"."gamevault_game_type_enum_old"
            RENAME TO "gamevault_game_type_enum"
        `);
  }
}
