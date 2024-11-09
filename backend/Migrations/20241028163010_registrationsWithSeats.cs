using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class registrationsWithSeats : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_registrations_AspNetUsers_UserId",
                table: "registrations");

            migrationBuilder.DropForeignKey(
                name: "FK_registrations_events_EventId",
                table: "registrations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_registrations",
                table: "registrations");

            migrationBuilder.DropIndex(
                name: "IX_registrations_UserId",
                table: "registrations");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "registrations",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "EventId",
                table: "registrations",
                newName: "event_id");

            migrationBuilder.AddColumn<int>(
                name: "seat_id",
                table: "registrations",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_registrations",
                table: "registrations",
                columns: new[] { "user_id", "event_id", "seat_id" });

            migrationBuilder.CreateTable(
                name: "tables",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    event_id = table.Column<int>(type: "integer", nullable: false),
                    event_id1 = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tables", x => x.id);
                    table.ForeignKey(
                        name: "FK_tables_events_event_id",
                        column: x => x.event_id,
                        principalTable: "events",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "seats",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    user_id = table.Column<int>(type: "integer", nullable: false),
                    table_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_seats", x => x.id);
                    table.ForeignKey(
                        name: "FK_seats_AspNetUsers_user_id",
                        column: x => x.user_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_seats_tables_table_id",
                        column: x => x.table_id,
                        principalTable: "tables",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_registrations_event_id",
                table: "registrations",
                column: "event_id");

            migrationBuilder.CreateIndex(
                name: "IX_registrations_seat_id",
                table: "registrations",
                column: "seat_id");

            migrationBuilder.CreateIndex(
                name: "IX_seats_table_id",
                table: "seats",
                column: "table_id");

            migrationBuilder.CreateIndex(
                name: "IX_seats_user_id",
                table: "seats",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_tables_event_id",
                table: "tables",
                column: "event_id");

            migrationBuilder.AddForeignKey(
                name: "FK_registrations_AspNetUsers_user_id",
                table: "registrations",
                column: "user_id",
                principalTable: "AspNetUsers",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_registrations_events_event_id",
                table: "registrations",
                column: "event_id",
                principalTable: "events",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_registrations_seats_seat_id",
                table: "registrations",
                column: "seat_id",
                principalTable: "seats",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_registrations_AspNetUsers_user_id",
                table: "registrations");

            migrationBuilder.DropForeignKey(
                name: "FK_registrations_events_event_id",
                table: "registrations");

            migrationBuilder.DropForeignKey(
                name: "FK_registrations_seats_seat_id",
                table: "registrations");

            migrationBuilder.DropTable(
                name: "seats");

            migrationBuilder.DropTable(
                name: "tables");

            migrationBuilder.DropPrimaryKey(
                name: "PK_registrations",
                table: "registrations");

            migrationBuilder.DropIndex(
                name: "IX_registrations_event_id",
                table: "registrations");

            migrationBuilder.DropIndex(
                name: "IX_registrations_seat_id",
                table: "registrations");

            migrationBuilder.DropColumn(
                name: "seat_id",
                table: "registrations");

            migrationBuilder.RenameColumn(
                name: "event_id",
                table: "registrations",
                newName: "EventId");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "registrations",
                newName: "UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_registrations",
                table: "registrations",
                columns: new[] { "EventId", "UserId" });

            migrationBuilder.CreateIndex(
                name: "IX_registrations_UserId",
                table: "registrations",
                column: "UserId");

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
    }
}
