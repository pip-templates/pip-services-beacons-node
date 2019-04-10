#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component data
$component = Get-Content -Path "component.json" | ConvertFrom-Json
$package = Get-Content -Path "package.json" | ConvertFrom-Json

if ($component.version -ne $package.version) {
    throw "Versions in component.json and package.json do not match"
}

# Automatically login to npmjs
if ($env:NPM_USER -ne $null -and $env:NPM_PASS -ne $null -and $env:NPM_EMAIL -ne $null) {
    if (npm whoami -ne $env:NPM_USER) {
        npm-cli-login
    }
} 

# Check if version exist on npmjs
$npmjsPackageVersions = npm view $package.name versions

if ($npmjsPackageVersions -ne $null -and $npmjsPackageVersions.Contains($package.version)) {
    Write-Host "Package already exists on npmjs, publish skipped."
} else {
    # Publish to npm repository
    npm publish
}