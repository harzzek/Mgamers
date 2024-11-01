using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class RemovedUserFromSeatThree : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_seats_AspNetUsers_UserId",
                table: "seats");

            migrationBuilder.DropIndex(
                name: "IX_seats_UserId",
                table: "seats");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "seats");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "seats",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_seats_UserId",
                table: "seats",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_seats_AspNetUsers_UserId",
                table: "seats",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "id");
        }
    }
}
