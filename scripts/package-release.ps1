param(
  [Parameter(Mandatory = $true)]
  [string]$Version,

  [string]$Ref = "HEAD",
  [string]$OutputDirectory = "dist"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$output = Join-Path $root $OutputDirectory
$archive = Join-Path $output "Qianxi-Translate-v$Version.zip"

$manifest = git -C $root show "${Ref}:manifest.json" | ConvertFrom-Json
if ($manifest.version -ne $Version) {
  throw "Manifest version $($manifest.version) does not match requested version $Version."
}

& (Join-Path $PSScriptRoot "check-private-data.ps1") -Ref $Ref

New-Item -ItemType Directory -Path $output -Force | Out-Null
git -C $root archive `
  --format=zip `
  "--prefix=Qianxi-Translate/" `
  "--output=$archive" `
  $Ref

Write-Output $archive
