using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class eventsWithEndTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "time",
                table: "events",
                newName: "start_time");

            migrationBuilder.RenameColumn(
                name: "date",
                table: "events",
                newName: "start_date");

            migrationBuilder.AddColumn<string>(
                name: "end_date",
                table: "events",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "end_time",
                table: "events",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "end_date",
                table: "events");

            migrationBuilder.DropColumn(
                name: "end_time",
                table: "events");

            migrationBuilder.RenameColumn(
                name: "start_time",
                table: "events",
                newName: "time");

            migrationBuilder.RenameColumn(
                name: "start_date",
                table: "events",
                newName: "date");
        }
    }
}
