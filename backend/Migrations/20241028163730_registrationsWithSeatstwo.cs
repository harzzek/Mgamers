using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class registrationsWithSeatstwo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_registrations_seats_seat_id",
                table: "registrations");

            migrationBuilder.AddForeignKey(
                name: "FK_registrations_seats_seat_id",
                table: "registrations",
                column: "seat_id",
                principalTable: "seats",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_registrations_seats_seat_id",
                table: "registrations");

            migrationBuilder.AddForeignKey(
                name: "FK_registrations_seats_seat_id",
                table: "registrations",
                column: "seat_id",
                principalTable: "seats",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
