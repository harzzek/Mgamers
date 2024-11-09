using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class RemovedUserFromSeat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_registrations_seat_id",
                table: "registrations");

            migrationBuilder.CreateIndex(
                name: "IX_registrations_seat_id",
                table: "registrations",
                column: "seat_id",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_registrations_seat_id",
                table: "registrations");

            migrationBuilder.CreateIndex(
                name: "IX_registrations_seat_id",
                table: "registrations",
                column: "seat_id");
        }
    }
}
