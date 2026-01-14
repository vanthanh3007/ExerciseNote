# PowerShell script to initialize repository, commit, and push to GitHub
# Run from project root in PowerShell (as a user with Git configured).

Set-StrictMode -Version Latest

Write-Output "=== Prepare to push ExerciseNote to GitHub ==="

# Initialize git if needed
if (-not (Test-Path .git)) {
  Write-Output "Initializing new git repository..."
  git init
} else {
  Write-Output ".git already exists. Using existing repository."
}

# Add all files
Write-Output "Staging files..."
git add -A

# Commit (create initial commit if none exists)
$hasHead = $false
try {
  git rev-parse --verify HEAD > $null 2>&1
  $hasHead = $true
} catch {
  $hasHead = $false
}

if (-not $hasHead) {
  Write-Output "Creating initial commit..."
  git commit -m "Initial commit: scaffold Workout Log app"
} else {
  Write-Output "Creating update commit if there are staged changes..."
  try {
    git commit -m "Update commit: scaffold changes"
  } catch {
    Write-Output "No changes to commit."
  }
}

# Ensure main branch
Write-Output "Switching/creating branch 'main'..."
git branch -M main

# Set remote
$remoteUrl = 'https://github.com/vanthanh3007/ExerciseNote.git'
try {
  git remote remove origin 2>$null
} catch {
  # ignore
}
Write-Output "Adding remote origin: $remoteUrl"
git remote add origin $remoteUrl

# Push
Write-Output "Pushing to origin/main. You may be prompted for credentials (username and PAT) if not already authenticated."
try {
  git push -u origin main
  Write-Output "Push completed."
} catch {
  Write-Error "Push failed. See output above. If authentication fails, configure Git credentials or use a Personal Access Token (PAT)."
}
