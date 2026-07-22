CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

START TRANSACTION;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20250920123113_Initial') THEN
    CREATE TABLE "Posts" (
        "Id" uuid NOT NULL DEFAULT (gen_random_uuid()),
        "DocumentId" text NOT NULL,
        "StrapiId" integer NOT NULL,
        "PublishedAt" timestamp with time zone,
        "PostData" jsonb NOT NULL,
        "CreatedAt" timestamp with time zone NOT NULL,
        "UpdatedAt" timestamp with time zone NOT NULL,
        CONSTRAINT "PK_Posts" PRIMARY KEY ("Id")
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20250920123113_Initial') THEN
    CREATE TABLE "Users" (
        "Id" uuid NOT NULL DEFAULT (gen_random_uuid()),
        "Provider" text NOT NULL,
        "ProviderId" text NOT NULL,
        "Admin" boolean NOT NULL,
        "Username" text NOT NULL,
        CONSTRAINT "PK_Users" PRIMARY KEY ("Id")
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20250920123113_Initial') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20250920123113_Initial', '9.0.2');
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20251003183150_Added_MetadataEntities') THEN
    CREATE TABLE "Authors" (
        "Id" uuid NOT NULL DEFAULT (gen_random_uuid()),
        "DocumentId" text NOT NULL,
        "StrapiId" integer NOT NULL,
        "AuthorData" jsonb NOT NULL,
        "CreatedAt" timestamp with time zone NOT NULL,
        "UpdatedAt" timestamp with time zone NOT NULL,
        CONSTRAINT "PK_Authors" PRIMARY KEY ("Id")
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20251003183150_Added_MetadataEntities') THEN
    CREATE TABLE "Categories" (
        "Id" uuid NOT NULL DEFAULT (gen_random_uuid()),
        "DocumentId" text NOT NULL,
        "StrapiId" integer NOT NULL,
        "CategoryData" jsonb NOT NULL,
        "CreatedAt" timestamp with time zone NOT NULL,
        "UpdatedAt" timestamp with time zone NOT NULL,
        CONSTRAINT "PK_Categories" PRIMARY KEY ("Id")
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20251003183150_Added_MetadataEntities') THEN
    CREATE TABLE "Characters" (
        "Id" uuid NOT NULL DEFAULT (gen_random_uuid()),
        "DocumentId" text NOT NULL,
        "StrapiId" integer NOT NULL,
        "CharacterData" jsonb NOT NULL,
        "CreatedAt" timestamp with time zone NOT NULL,
        "UpdatedAt" timestamp with time zone NOT NULL,
        CONSTRAINT "PK_Characters" PRIMARY KEY ("Id")
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20251003183150_Added_MetadataEntities') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20251003183150_Added_MetadataEntities', '9.0.2');
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20251005180040_Added_Bookmarks') THEN
    CREATE TABLE "Bookmarks" (
        "Id" uuid NOT NULL DEFAULT (gen_random_uuid()),
        "UserId" uuid NOT NULL,
        "PostId" uuid NOT NULL,
        "CreatedAt" timestamp with time zone NOT NULL,
        "UpdatedAt" timestamp with time zone NOT NULL,
        CONSTRAINT "PK_Bookmarks" PRIMARY KEY ("Id"),
        CONSTRAINT "FK_Bookmarks_Posts_PostId" FOREIGN KEY ("PostId") REFERENCES "Posts" ("Id") ON DELETE CASCADE,
        CONSTRAINT "FK_Bookmarks_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE CASCADE
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20251005180040_Added_Bookmarks') THEN
    CREATE INDEX "IX_Bookmarks_PostId" ON "Bookmarks" ("PostId");
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20251005180040_Added_Bookmarks') THEN
    CREATE INDEX "IX_Bookmarks_UserId" ON "Bookmarks" ("UserId");
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20251005180040_Added_Bookmarks') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20251005180040_Added_Bookmarks', '9.0.2');
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20251015113500_Updated_StrapiEntities') THEN
    ALTER TABLE "Posts" RENAME COLUMN "PostData" TO "Data";
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20251015113500_Updated_StrapiEntities') THEN
    ALTER TABLE "Characters" RENAME COLUMN "CharacterData" TO "Data";
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20251015113500_Updated_StrapiEntities') THEN
    ALTER TABLE "Categories" RENAME COLUMN "CategoryData" TO "Data";
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20251015113500_Updated_StrapiEntities') THEN
    ALTER TABLE "Authors" RENAME COLUMN "AuthorData" TO "Data";
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20251015113500_Updated_StrapiEntities') THEN
    ALTER TABLE "Characters" ADD "PublishedAt" timestamp with time zone;
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20251015113500_Updated_StrapiEntities') THEN
    ALTER TABLE "Categories" ADD "PublishedAt" timestamp with time zone;
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20251015113500_Updated_StrapiEntities') THEN
    ALTER TABLE "Authors" ADD "PublishedAt" timestamp with time zone;
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20251015113500_Updated_StrapiEntities') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20251015113500_Updated_StrapiEntities', '9.0.2');
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20251015130515_Added_Resources') THEN
    CREATE TABLE "Resources" (
        "Id" uuid NOT NULL DEFAULT (gen_random_uuid()),
        "CreatedAt" timestamp with time zone NOT NULL,
        "UpdatedAt" timestamp with time zone NOT NULL,
        "DocumentId" text NOT NULL,
        "PublishedAt" timestamp with time zone,
        "StrapiId" integer NOT NULL,
        "Data" jsonb NOT NULL,
        CONSTRAINT "PK_Resources" PRIMARY KEY ("Id")
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20251015130515_Added_Resources') THEN
    CREATE TABLE "Sources" (
        "Id" uuid NOT NULL DEFAULT (gen_random_uuid()),
        "CreatedAt" timestamp with time zone NOT NULL,
        "UpdatedAt" timestamp with time zone NOT NULL,
        "DocumentId" text NOT NULL,
        "PublishedAt" timestamp with time zone,
        "StrapiId" integer NOT NULL,
        "Data" jsonb NOT NULL,
        CONSTRAINT "PK_Sources" PRIMARY KEY ("Id")
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20251015130515_Added_Resources') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20251015130515_Added_Resources', '9.0.2');
    END IF;
END $EF$;
COMMIT;

