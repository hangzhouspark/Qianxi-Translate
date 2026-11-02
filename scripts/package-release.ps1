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

$privateDataPattern = 'C:\\Users|E:\\CodexWorkspaces|D:\\AI|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}|Bearer [A-Za-z0-9._-]{20,}'
$privateData = git -C $root grep -l -I -E `
  -e $privateDataPattern `
  $Ref -- `
  ":(exclude)licenses/*" `
  ":(exclude)ocr-runtime/*NOTICES.txt" `
  ":(exclude)ocr-runtime/*LICENSE.txt"

if ($privateData) {
  throw "Potential private data found in tracked files: $($privateData -join ', ')"
}

New-Item -ItemType Directory -Path $output -Force | Out-Null
git -C $root archive `
  --format=zip `
  "--prefix=Qianxi-Translate/" `
  "--output=$archive" `
  $Ref

Write-Output $archive
