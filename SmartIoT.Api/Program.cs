var builder = WebApplication.CreateBuilder(args);

// 1. ADIM: CORS Servisini Kaydet
// Bu adım, uygulamanın dış kaynaklardan (örneğin React) gelen isteklere nasıl yanıt vereceğini tanımlar.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()   // Şimdilik her yerden gelen isteğe izin veriyoruz
              .AllowAnyHeader()   // Tüm başlıklara izin ver (Content-Type vb.)
              .AllowAnyMethod();  // Tüm metodlara izin ver (GET, POST, PUT, DELETE)
    });
});

// OpenAPI (Swagger) desteği
builder.Services.AddOpenApi();

var app = builder.Build();

// 2. ADIM: CORS Middleware'ini Aktif Et
// ÖNEMLİ: app.UseCors() mutlaka yönlendirme (routing) ve endpoint tanımlarından önce gelmelidir.
app.UseCors(); 

// HTTP istek hattını yapılandır
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}