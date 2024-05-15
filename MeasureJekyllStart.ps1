$StartTime = Get-Date
$Process = Start-Process -FilePath "bundle" -ArgumentList "exec jekyll serve" -PassThru
Start-Sleep -Seconds 5 # Ajusta este tiempo según sea necesario
$Process | Stop-Process

$EndTime = Get-Date
$Duration = $EndTime - $StartTime
Write-Output "Tiempo de inicio del servidor: $($Duration.TotalSeconds) segundos"
