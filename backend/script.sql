CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

START TRANSACTION;
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

CREATE TABLE "Users" (
    "Id" uuid NOT NULL DEFAULT (gen_random_uuid()),
    "Provider" text NOT NULL,
    "ProviderId" text NOT NULL,
    "Admin" boolean NOT NULL,
    "Username" text NOT NULL,
    CONSTRAINT "PK_Users" PRIMARY KEY ("Id")
);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20250920123113_Initial', '9.0.2');

COMMIT;

