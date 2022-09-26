using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.DependencyInjection;
using salsa.api.Data;
using salsa.api.Services;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

var connectionStringName = "DataContextLocal";

builder.Services.AddDbContext<DataContext>(options =>
    {
        var connectionString = builder.Configuration.GetConnectionString(connectionStringName);
        if (connectionString == null)
        {
            throw new InvalidOperationException($"Connection string {connectionStringName} not found.");
        }

        options.UseSqlite(connectionString);

        // options.UseSqlServer(connectionString
        //     .Replace("DataContextConnectionString", config["DataContextConnectionString"]),
        //     options => options.EnableRetryOnFailure()
        // );
    });

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IRepository, Repository>();
builder.Services.AddSingleton<DateProvider>();
builder.Services.AddAutoMapper(typeof(Program));

var app = builder.Build();

// if (app.Environment.IsDevelopment())
// {
app.UseSwagger();
app.UseSwaggerUI();
// }

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await SeedData.Initialize(services);
}

app.UseCors(options => options
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
