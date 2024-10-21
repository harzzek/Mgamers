using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class updatedTheRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_registrations_AspNetUsers_EventId",
                table: "registrations");

            migrationBuilder.DropForeignKey(
                name: "FK_registrations_events_UserId",
                table: "registrations");

            migrationBuilder.AddForeignKey(
                name: "FK_registrations_AspNetUsers_UserId",
                table: "registrations",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_registrations_events_EventId",
                table: "registrations",
                column: "EventId",
                principalTable: "events",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_registrations_AspNetUsers_UserId",
                table: "registrations");

            migrationBuilder.DropForeignKey(
                name: "FK_registrations_events_EventId",
                table: "registrations");

            migrationBuilder.AddForeignKey(
                name: "FK_registrations_AspNetUsers_EventId",
                table: "registrations",
                column: "EventId",
                principalTable: "AspNetUsers",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_registrations_events_UserId",
                table: "registrations",
                column: "UserId",
                principalTable: "events",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
