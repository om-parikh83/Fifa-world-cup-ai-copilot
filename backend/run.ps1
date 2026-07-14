# Activates virtual environment and starts Django server
Write-Host "Activating virtual environment..." -ForegroundColor Cyan
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force
& "..\.venv\Scripts\Activate.ps1"
Write-Host "Starting Django server..." -ForegroundColor Green
python manage.py runserver
