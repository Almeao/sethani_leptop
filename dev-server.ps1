param(
  [int]$Port = 8080
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Net
Add-Type -AssemblyName System.IO

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)
try {
  $listener.Start()
  Write-Output "Serving $prefix (cwd: $(Get-Location))"
} catch {
  Write-Error "Failed to start HttpListener on $prefix. Try a different port or run PowerShell as Administrator. Error: $_"
  exit 1
}

while ($true) {
  $context = $listener.GetContext()
  $request = $context.Request
  $response = $context.Response
  try {
    $localPath = $request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($localPath)) { $localPath = 'index.html' }
    $filePath = Join-Path (Get-Location) $localPath

    if (-not (Test-Path $filePath)) {
      $response.StatusCode = 404
      $response.OutputStream.Close()
      $response.Close()
      continue
    }

    $ext = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
    switch ($ext) {
      '.html' { $response.ContentType = 'text/html' }
      '.css' { $response.ContentType = 'text/css' }
      '.js' { $response.ContentType = 'application/javascript' }
      '.png' { $response.ContentType = 'image/png' }
      '.jpg' { $response.ContentType = 'image/jpeg' }
      '.jpeg' { $response.ContentType = 'image/jpeg' }
      '.webp' { $response.ContentType = 'image/webp' }
      '.svg' { $response.ContentType = 'image/svg+xml' }
      '.mp4' { $response.ContentType = 'video/mp4' }
      default { $response.ContentType = 'application/octet-stream' }
    }

    $bytes = [System.IO.File]::ReadAllBytes($filePath)
    $response.ContentLength64 = $bytes.Length
    $response.OutputStream.Write($bytes, 0, $bytes.Length)
  } catch {
    Write-Error $_
  } finally {
    $response.OutputStream.Close()
    $response.Close()
  }
}
