using INTEX.API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//MovieDataDataBase
builder.Services.AddDbContext<MovieDbContext>(options => 
    options.UseSqlite(builder.Configuration.GetConnectionString("MovieConnection")));

//ContentRecommenderDataBase
builder.Services.AddDbContext<RecommendationContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("ContentRecommenderConnection")));

//CollaborativeRecommenderDataBase
builder.Services.AddDbContext<CollaborativeRecommendationContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("CollaborativeRecommenderConnection")));

//RecommendedMoviesDataBase
builder.Services.AddDbContext<GenreRecommenderDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("AzureSqlConnection")));

builder.Services.AddCors(options=> options.AddPolicy(
    "AllowReactAppBlah", 
    policy => {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader();
    })
);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactAppBlah");

app.UseStaticFiles();
app.UseAuthorization();

app.MapControllers();

app.Run();
