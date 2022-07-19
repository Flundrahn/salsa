using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ordina.api.Migrations
{
    public partial class PreventDefaultIntKeyValues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resources_Topics_TopicId",
                table: "Resources");

            migrationBuilder.DropForeignKey(
                name: "FK_Topics_Weeks_WeekId",
                table: "Topics");

            migrationBuilder.AlterColumn<int>(
                name: "WeekId",
                table: "Topics",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Day",
                table: "Topics",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "TopicId",
                table: "Resources",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Resources_Topics_TopicId",
                table: "Resources",
                column: "TopicId",
                principalTable: "Topics",
                principalColumn: "TopicId");

            migrationBuilder.AddForeignKey(
                name: "FK_Topics_Weeks_WeekId",
                table: "Topics",
                column: "WeekId",
                principalTable: "Weeks",
                principalColumn: "WeekId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resources_Topics_TopicId",
                table: "Resources");

            migrationBuilder.DropForeignKey(
                name: "FK_Topics_Weeks_WeekId",
                table: "Topics");

            migrationBuilder.AlterColumn<int>(
                name: "WeekId",
                table: "Topics",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Day",
                table: "Topics",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TopicId",
                table: "Resources",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Resources_Topics_TopicId",
                table: "Resources",
                column: "TopicId",
                principalTable: "Topics",
                principalColumn: "TopicId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Topics_Weeks_WeekId",
                table: "Topics",
                column: "WeekId",
                principalTable: "Weeks",
                principalColumn: "WeekId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
