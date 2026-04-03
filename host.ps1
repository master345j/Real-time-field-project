$listener = New-Object Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server running at http://localhost:8080/"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $response = $context.Response
        $response.ContentType = "text/html"
        $content = [System.IO.File]::ReadAllBytes("d:\New folder\frontend\preview.html")
        $response.ContentLength64 = $content.Length
        $response.OutputStream.Write($content, 0, $content.Length)
        $response.Close()
    }
} finally {
    $listener.Stop()
}
