import { MigrationInterface, type QueryRunner } from "typeorm";

export class LinuxSetupGameType1788359591362 implements MigrationInterface {
  name = "LinuxSetupGameType1788359591362";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_dc16bc448f2591a832533f25d9"`);
    await queryRunner.query(`DROP INDEX "IDX_91d454956bd20f46b646b05b91"`);
    await queryRunner.query(`DROP INDEX "IDX_73e99cf1379987ed7c5983d74f"`);
    await queryRunner.query(`
            CREATE TABLE "temporary_gamevault_game" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "deleted_at" datetime,
                "entity_version" integer NOT NULL,
                "file_path" varchar NOT NULL,
                "size" bigint NOT NULL DEFAULT (0),
                "title" varchar,
                "sort_title" varchar,
                "version" varchar,
                "release_date" datetime,
                "early_access" boolean NOT NULL DEFAULT (0),
                "download_count" integer NOT NULL DEFAULT (0),
                "type" varchar CHECK(
                    "type" IN (
                        'UNDETECTABLE',
                        'WINDOWS_SETUP',
                        'WINDOWS_PORTABLE',
                        'WINDOWS_SOFTWARE',
                        'LINUX_PORTABLE',
                        'LINUX_SOFTWARE',
                        'LINUX_SETUP'
                    )
                ) NOT NULL DEFAULT ('UNDETECTABLE'),
                "user_metadata_id" integer,
                "metadata_id" integer,
                CONSTRAINT "UQ_91d454956bd20f46b646b05b91f" UNIQUE ("file_path"),
                CONSTRAINT "REL_edc9b16a9e16d394b2ca3b49b1" UNIQUE ("user_metadata_id"),
                CONSTRAINT "REL_aab0797ae3873a5ef2817d0989" UNIQUE ("metadata_id"),
                CONSTRAINT "FK_edc9b16a9e16d394b2ca3b49b12" FOREIGN KEY ("user_metadata_id") REFERENCES "game_metadata" ("id") ON DELETE
                SET NULL ON UPDATE NO ACTION,
                    CONSTRAINT "FK_aab0797ae3873a5ef2817d09891" FOREIGN KEY ("metadata_id") REFERENCES "game_metadata" ("id") ON DELETE
                SET NULL ON UPDATE NO ACTION
            )
        `);
    await queryRunner.query(`
            INSERT INTO "temporary_gamevault_game"(
                    "id",
                    "created_at",
                    "updated_at",
                    "deleted_at",
                    "entity_version",
                    "file_path",
                    "size",
                    "title",
                    "sort_title",
                    "version",
                    "release_date",
                    "early_access",
                    "download_count",
                    "type",
                    "user_metadata_id",
                    "metadata_id"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "deleted_at",
                "entity_version",
                "file_path",
                "size",
                "title",
                "sort_title",
                "version",
                "release_date",
                "early_access",
                "download_count",
                "type",
                "user_metadata_id",
                "metadata_id"
            FROM "gamevault_game"
        `);
    await queryRunner.query(`DROP TABLE "gamevault_game"`);
    await queryRunner.query(`
            ALTER TABLE "temporary_gamevault_game"
                RENAME TO "gamevault_game"
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_dc16bc448f2591a832533f25d9" ON "gamevault_game" ("id")
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_91d454956bd20f46b646b05b91" ON "gamevault_game" ("file_path")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_73e99cf1379987ed7c5983d74f" ON "gamevault_game" ("release_date")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_73e99cf1379987ed7c5983d74f"`);
    await queryRunner.query(`DROP INDEX "IDX_91d454956bd20f46b646b05b91"`);
    await queryRunner.query(`DROP INDEX "IDX_dc16bc448f2591a832533f25d9"`);
    await queryRunner.query(`
            CREATE TABLE "temporary_gamevault_game" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "deleted_at" datetime,
                "entity_version" integer NOT NULL,
                "file_path" varchar NOT NULL,
                "size" bigint NOT NULL DEFAULT (0),
                "title" varchar,
                "sort_title" varchar,
                "version" varchar,
                "release_date" datetime,
                "early_access" boolean NOT NULL DEFAULT (0),
                "download_count" integer NOT NULL DEFAULT (0),
                "type" varchar CHECK(
                    "type" IN (
                        'UNDETECTABLE',
                        'WINDOWS_SETUP',
                        'WINDOWS_PORTABLE',
                        'LINUX_PORTABLE'
                    )
                ) NOT NULL DEFAULT ('UNDETECTABLE'),
                "user_metadata_id" integer,
                "metadata_id" integer,
                CONSTRAINT "UQ_91d454956bd20f46b646b05b91f" UNIQUE ("file_path"),
                CONSTRAINT "REL_edc9b16a9e16d394b2ca3b49b1" UNIQUE ("user_metadata_id"),
                CONSTRAINT "REL_aab0797ae3873a5ef2817d0989" UNIQUE ("metadata_id"),
                CONSTRAINT "FK_edc9b16a9e16d394b2ca3b49b12" FOREIGN KEY ("user_metadata_id") REFERENCES "game_metadata" ("id") ON DELETE
                SET NULL ON UPDATE NO ACTION,
                    CONSTRAINT "FK_aab0797ae3873a5ef2817d09891" FOREIGN KEY ("metadata_id") REFERENCES "game_metadata" ("id") ON DELETE
                SET NULL ON UPDATE NO ACTION
            )
        `);
    await queryRunner.query(`
            INSERT INTO "temporary_gamevault_game"(
                    "id",
                    "created_at",
                    "updated_at",
                    "deleted_at",
                    "entity_version",
                    "file_path",
                    "size",
                    "title",
                    "sort_title",
                    "version",
                    "release_date",
                    "early_access",
                    "download_count",
                    "type",
                    "user_metadata_id",
                    "metadata_id"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "deleted_at",
                "entity_version",
                "file_path",
                "size",
                "title",
                "sort_title",
                "version",
                "release_date",
                "early_access",
                "download_count",
                "type",
                "user_metadata_id",
                "metadata_id"
            FROM "gamevault_game"
        `);
    await queryRunner.query(`DROP TABLE "gamevault_game"`);
    await queryRunner.query(`
            ALTER TABLE "temporary_gamevault_game"
                RENAME TO "gamevault_game"
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_dc16bc448f2591a832533f25d9" ON "gamevault_game" ("id")
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_91d454956bd20f46b646b05b91" ON "gamevault_game" ("file_path")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_73e99cf1379987ed7c5983d74f" ON "gamevault_game" ("release_date")
        `);
  }
}
