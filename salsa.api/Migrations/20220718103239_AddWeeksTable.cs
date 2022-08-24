using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salsa.api.Migrations
{
    public partial class AddWeeksTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Weeks",
                columns: table => new
                {
                    WeekId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WeekNumber = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Weeks", x => x.WeekId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Topics_WeekId",
                table: "Topics",
                column: "WeekId");

            migrationBuilder.AddForeignKey(
                name: "FK_Topics_Weeks_WeekId",
                table: "Topics",
                column: "WeekId",
                principalTable: "Weeks",
                principalColumn: "WeekId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Topics_Weeks_WeekId",
                table: "Topics");

            migrationBuilder.DropTable(
                name: "Weeks");

            migrationBuilder.DropIndex(
                name: "IX_Topics_WeekId",
                table: "Topics");
        }
    }
}
