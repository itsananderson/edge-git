$setupDIr = Split-Path $MyInvocation.MyCommand.Path
$netlibDir = Join-Path $setupDir "netlib"
$nugetPath = Join-Path $netlibDir "nuget.exe"

if (!(Test-Path $nugetPath)) {
    Write-Output "Downloading nuget.exe"
    $client = new-object System.Net.WebClient
    $client.DownloadFile("http://nuget.org/nuget.exe", $nugetPath)
}

pushd $netlibDir
& $nugetPath install LibGit2Sharp -Version 0.19.0.0
popd
