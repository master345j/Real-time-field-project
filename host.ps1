$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$previewPath = Join-Path $Root "frontend\preview.html"

if (-not (Test-Path $previewPath)) {
    Write-Error "preview.html not found at: $previewPath"
    exit 1
}

$listener = New-Object Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Serving $previewPath"
Write-Host "Open http://localhost:8080/preview.html (or http://localhost:8080/)"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $response = $context.Response
        $requestPath = $context.Request.Url.AbsolutePath.TrimEnd('/')
        if ($requestPath -eq "" -or $requestPath -eq "/") {
            $requestPath = "/preview.html"
        }

        if ($requestPath -eq "/preview.html" -or $requestPath -eq "/preview") {
            $response.ContentType = "text/html; charset=utf-8"
            $content = [System.IO.File]::ReadAllBytes($previewPath)
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("Not found")
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
