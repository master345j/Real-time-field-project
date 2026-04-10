$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $Root

Write-Host "Starting MongoDB (Docker)..."
try {
    docker compose up -d mongo 2>$null
    if ($LASTEXITCODE -ne 0) { throw "docker compose failed" }
    Start-Sleep -Seconds 2
} catch {
    Write-Warning "Docker not available or compose failed. Ensure MongoDB is running on 127.0.0.1:27017"
}

Set-Location (Join-Path $Root "backend")
if (-not (Test-Path "node_modules")) {
    npm install
}
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
}
Write-Host "Seeding demo user (alex@example.com / pass123)..."
node scripts/seed.js
Write-Host "Starting API on http://localhost:5000 — preview: http://localhost:5000/preview.html"
node src/server.js
