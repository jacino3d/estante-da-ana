$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Push-Location -LiteralPath $projectRoot
try {
  node scripts/build-pages.mjs
  if ($LASTEXITCODE -ne 0) { throw 'Build failed' }
  $stage = Join-Path $projectRoot ('release/github-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
  New-Item -ItemType Directory -Path $stage -Force | Out-Null
  Get-ChildItem -LiteralPath (Join-Path $projectRoot 'dist') -Force | Copy-Item -Destination $stage -Recurse
  foreach ($name in @('manage-inventory.html','inventory-manager.js','.gitignore','PUBLICAR.md')) { Copy-Item -LiteralPath (Join-Path $projectRoot $name) -Destination $stage }
  Copy-Item -LiteralPath (Join-Path $projectRoot 'PUBLICAR.md') -Destination (Join-Path $stage 'README.md')
  foreach ($name in @('scripts','.github','contact-gateway')) { Copy-Item -LiteralPath (Join-Path $projectRoot $name) -Destination $stage -Recurse }
  $archive = Join-Path $projectRoot ('release/estante-da-ana-github-' + (Get-Date -Format 'yyyyMMdd-HHmmss') + '.zip')
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  $zip = [System.IO.Compression.ZipFile]::Open($archive,[System.IO.Compression.ZipArchiveMode]::Create)
  try {
    foreach ($file in Get-ChildItem -LiteralPath $stage -File -Recurse -Force) {
      $relative = $file.FullName.Substring($stage.Length + 1).Replace('\','/')
      [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip,$file.FullName,$relative) | Out-Null
    }
  } finally { $zip.Dispose() }
  Write-Output $archive
} finally { Pop-Location }
