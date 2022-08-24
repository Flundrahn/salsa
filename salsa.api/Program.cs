using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using salsa.api.Data;
using salsa.api.Services;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

var dbUser = "sql-server-username";
var dbPass = "sql-server-password";

builder.Services.AddDbContext<DataContext>(options =>
    {
        var connectionString = builder.Configuration.GetConnectionString("DataContext");
        if (connectionString == null)
        {
            throw new InvalidOperationException("Connection string 'DataContext' not found.");
        }
        options.UseSqlServer(connectionString
        .Replace(dbUser, config[dbUser])
        .Replace(dbPass, config[dbPass]));
    });

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IRepository, Repository>();
builder.Services.AddSingleton<DateProvider>();
builder.Services.AddAutoMapper(typeof(Program));

var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
app.UseSwagger();
app.UseSwaggerUI();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    SeedData.Initialize(services);
}

// const URL = 'https://localhost:3000';
// const URL = 'https://ordina-web-ui.azurewebsites.net/';

app.UseCors(options => options
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
