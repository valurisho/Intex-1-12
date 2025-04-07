using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace INTEX.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Movies",
                columns: table => new
                {
                    show_id = table.Column<string>(type: "TEXT", nullable: false),
                    type = table.Column<string>(type: "TEXT", nullable: false),
                    title = table.Column<string>(type: "TEXT", nullable: false),
                    director = table.Column<string>(type: "TEXT", nullable: true),
                    cast = table.Column<string>(type: "TEXT", nullable: true),
                    country = table.Column<string>(type: "TEXT", nullable: true),
                    release_year = table.Column<int>(type: "INTEGER", nullable: true),
                    rating = table.Column<string>(type: "TEXT", nullable: true),
                    duration = table.Column<string>(type: "TEXT", nullable: true),
                    description = table.Column<string>(type: "TEXT", nullable: true),
                    Action = table.Column<bool>(type: "INTEGER", nullable: false),
                    Adventure = table.Column<bool>(type: "INTEGER", nullable: false),
                    AnimeSeriesInternationalTVShows = table.Column<bool>(type: "INTEGER", nullable: false),
                    BritishTVShowsDocuseriesInternationalTVShows = table.Column<bool>(type: "INTEGER", nullable: false),
                    Children = table.Column<bool>(type: "INTEGER", nullable: false),
                    Comedies = table.Column<bool>(type: "INTEGER", nullable: false),
                    ComediesDramasInternationalMovies = table.Column<bool>(type: "INTEGER", nullable: false),
                    ComediesInternationalMovies = table.Column<bool>(type: "INTEGER", nullable: false),
                    ComediesRomanticMovies = table.Column<bool>(type: "INTEGER", nullable: false),
                    CrimeTVShowsDocuseries = table.Column<bool>(type: "INTEGER", nullable: false),
                    Documentaries = table.Column<bool>(type: "INTEGER", nullable: false),
                    DocumentariesInternationalMovies = table.Column<bool>(type: "INTEGER", nullable: false),
                    Docuseries = table.Column<bool>(type: "INTEGER", nullable: false),
                    Dramas = table.Column<bool>(type: "INTEGER", nullable: false),
                    DramasInternationalMovies = table.Column<bool>(type: "INTEGER", nullable: false),
                    DramasRomanticMovies = table.Column<bool>(type: "INTEGER", nullable: false),
                    FamilyMovies = table.Column<bool>(type: "INTEGER", nullable: false),
                    Fantasy = table.Column<bool>(type: "INTEGER", nullable: false),
                    HorrorMovies = table.Column<bool>(type: "INTEGER", nullable: false),
                    InternationalMoviesThrillers = table.Column<bool>(type: "INTEGER", nullable: false),
                    InternationalTVShowsRomanticTVShowsTVDramas = table.Column<bool>(type: "INTEGER", nullable: false),
                    KidsTV = table.Column<bool>(type: "INTEGER", nullable: false),
                    LanguageTVShows = table.Column<bool>(type: "INTEGER", nullable: false),
                    Musicals = table.Column<bool>(type: "INTEGER", nullable: false),
                    NatureTV = table.Column<bool>(type: "INTEGER", nullable: false),
                    RealityTV = table.Column<bool>(type: "INTEGER", nullable: false),
                    Spirituality = table.Column<bool>(type: "INTEGER", nullable: false),
                    TVAction = table.Column<bool>(type: "INTEGER", nullable: false),
                    TVComedies = table.Column<bool>(type: "INTEGER", nullable: false),
                    TVDramas = table.Column<bool>(type: "INTEGER", nullable: false),
                    TalkShowsTVComedies = table.Column<bool>(type: "INTEGER", nullable: false),
                    Thrillers = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movies", x => x.show_id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Phone = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    Age = table.Column<int>(type: "INTEGER", nullable: true),
                    Gender = table.Column<string>(type: "TEXT", nullable: true),
                    Netflix = table.Column<bool>(type: "INTEGER", nullable: true),
                    AmazonPrime = table.Column<bool>(type: "INTEGER", nullable: true),
                    DisneyPlus = table.Column<bool>(type: "INTEGER", nullable: true),
                    ParamountPlus = table.Column<bool>(type: "INTEGER", nullable: true),
                    Max = table.Column<bool>(type: "INTEGER", nullable: true),
                    Hulu = table.Column<bool>(type: "INTEGER", nullable: true),
                    AppleTVPlus = table.Column<bool>(type: "INTEGER", nullable: true),
                    Peacock = table.Column<bool>(type: "INTEGER", nullable: true),
                    City = table.Column<string>(type: "TEXT", nullable: true),
                    State = table.Column<string>(type: "TEXT", nullable: true),
                    Zip = table.Column<int>(type: "INTEGER", nullable: true),
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false),
                    IsAdmin = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Movies");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
