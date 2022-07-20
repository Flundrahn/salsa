using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ordina.api.Migrations
{
    public partial class ChangeColumnName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Resources",
                newName: "ResourceType");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ResourceType",
                table: "Resources",
                newName: "Type");
        }
    }
}
