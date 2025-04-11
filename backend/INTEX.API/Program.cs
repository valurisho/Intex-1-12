using INTEX.API.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using INTEX.API.Data;
using INTEX.API.Services;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

var movieApiKey = Environment.GetEnvironmentVariable("MOVIE_API_KEY");
Console.WriteLine($"🎬 Movie API Key: {movieApiKey}");

var jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET");


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection")));

//MovieDataDataBase
builder.Services.AddDbContext<MovieDbContext>(options => 
    options.UseSqlite(builder.Configuration.GetConnectionString("MovieConnection")));

//ContentRecommenderDataBase
builder.Services.AddDbContext<RecommendationContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("ContentRecommenderConnection")));

//CollaborativeRecommenderDataBase
builder.Services.AddDbContext<CollaborativeRecommendationContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("CollaborativeRecommenderConnection")));

//UserRecommendedMoviesDataBase
builder.Services.AddDbContext<UserRecommendationDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("AzureSqlConnection")));

//GenreRecommendationDatabase
builder.Services.AddDbContext<GenreRecommendationsContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("GenreRecommenderConnection")));

builder.Services.AddAuthorization();

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    // Stronger password rules
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 12;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = true;
    options.Password.RequiredUniqueChars = 4;

    // Already here in your code — keep these too
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email;
});

builder.Services.Configure<IdentityOptions>(options =>
{
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email;
});

builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();

builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender<IdentityUser>>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.None; // change after adding https for production
    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.LoginPath = "/login";
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactAppBlah",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "https://black-smoke-0a7ef231e.6.azurestaticapps.net") // Replace with your frontend URL
                .AllowCredentials() // Required to allow cookies
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactAppBlah");
app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapIdentityApi<IdentityUser>();

app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();

    // Ensure authentication cookie is removed
    context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
    {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.None
    });

    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();


app.MapGet("/pingauth", (ClaimsPrincipal user) =>
{
    if (!user.Identity?.IsAuthenticated ?? false)
    {
        return Results.Unauthorized();
    }

    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com";
    var role = user.FindFirstValue(ClaimTypes.Role) ?? "User"; // Default to "User" if missing

    return Results.Json(new { email = email, role = role });
}).RequireAuthorization();


app.Run();
