using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class RemovedUserIdOnSeatTwo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_seats_AspNetUsers_user_id",
                table: "seats");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "seats",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_seats_user_id",
                table: "seats",
                newName: "IX_seats_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_seats_AspNetUsers_UserId",
                table: "seats",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_seats_AspNetUsers_UserId",
                table: "seats");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "seats",
                newName: "user_id");

            migrationBuilder.RenameIndex(
                name: "IX_seats_UserId",
                table: "seats",
                newName: "IX_seats_user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_seats_AspNetUsers_user_id",
                table: "seats",
                column: "user_id",
                principalTable: "AspNetUsers",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
