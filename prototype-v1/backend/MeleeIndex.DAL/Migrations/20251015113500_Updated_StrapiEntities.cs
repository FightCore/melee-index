using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MeleeIndex.DAL.Migrations
{
    /// <inheritdoc />
    public partial class Updated_StrapiEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PostData",
                table: "Posts",
                newName: "Data");

            migrationBuilder.RenameColumn(
                name: "CharacterData",
                table: "Characters",
                newName: "Data");

            migrationBuilder.RenameColumn(
                name: "CategoryData",
                table: "Categories",
                newName: "Data");

            migrationBuilder.RenameColumn(
                name: "AuthorData",
                table: "Authors",
                newName: "Data");

            migrationBuilder.AddColumn<DateTime>(
                name: "PublishedAt",
                table: "Characters",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "PublishedAt",
                table: "Categories",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "PublishedAt",
                table: "Authors",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublishedAt",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "PublishedAt",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "PublishedAt",
                table: "Authors");

            migrationBuilder.RenameColumn(
                name: "Data",
                table: "Posts",
                newName: "PostData");

            migrationBuilder.RenameColumn(
                name: "Data",
                table: "Characters",
                newName: "CharacterData");

            migrationBuilder.RenameColumn(
                name: "Data",
                table: "Categories",
                newName: "CategoryData");

            migrationBuilder.RenameColumn(
                name: "Data",
                table: "Authors",
                newName: "AuthorData");
        }
    }
}
