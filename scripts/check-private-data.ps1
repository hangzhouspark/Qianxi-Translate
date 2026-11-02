param(
  [string]$Ref = ""
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$patterns = @(
  'C:\\Users\\[^\\\s]+',
  'E:\\CodexWorkspaces',
  'D:\\AI',
  'sk-[A-Za-z0-9_-]{20,}',
  'sk_(live|test)_[A-Za-z0-9]{16,}',
  'AIza[0-9A-Za-z_-]{30,}',
  'gsk_[A-Za-z0-9]{20,}',
  'hf_[A-Za-z0-9]{20,}',
  'xai-[A-Za-z0-9]{20,}',
  '"apiKey"\s*:\s*"[^"]{8,}"',
  'Authorization\s*[:=]\s*["'']Bearer\s+[A-Za-z0-9._-]{16,}'
)

$excludeArgs = @(
  ":(exclude)licenses/*",
  ":(exclude)ocr-runtime/*NOTICES.txt",
  ":(exclude)ocr-runtime/*LICENSE.txt"
)

$matches = @()
foreach ($pattern in $patterns) {
  $arguments = @(
    "-C", $root, "grep", "-n", "-I", "-E",
    "-e", $pattern
  )
  if ($Ref) {
    $arguments += $Ref
  } else {
    $arguments += "--cached"
  }
  $arguments += "--"
  $arguments += $excludeArgs

  $result = & git @arguments 2>$null
  if ($LASTEXITCODE -gt 1) {
    throw "Private-data scan failed with exit code $LASTEXITCODE."
  }
  if ($result) {
    $matches += $result
  }
}

if ($matches.Count) {
  throw "Potential private data found:`n$($matches -join [Environment]::NewLine)"
}

Write-Output "Private-data scan passed."
