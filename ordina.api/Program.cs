using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

var dbUser = "sql-server-username";
var dbPass = "sql-server-password";

builder.Services.AddDbContext<DataContext>(options =>
    {
        var connectionString = builder.Configuration.GetConnectionString("DataContext");
        if(connectionString == null) {
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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
