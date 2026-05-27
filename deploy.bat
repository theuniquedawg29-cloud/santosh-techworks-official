@echo off
echo 🚀 Quant-Elite Website Deployment Script
echo ========================================

set username=theuniquedawg29-cloud
set repo_name=santosh-techworks-official

echo.
echo Setting up GitHub remote for %repo_name%...
git remote set-url origin https://github.com/%username%/%repo_name%.git 2>nul || git remote add origin https://github.com/%username%/%repo_name%.git

echo.
echo Pulling latest changes from remote...
git pull origin main --rebase

echo.
echo Pushing to GitHub...
git add .
git commit -m "Update website content and installation guide"
git branch -M main
git push -u origin main

echo.
echo ✅ Deployment complete!
echo.
echo Your website will be live at: https://%username%.github.io/%repo_name%/
echo.
pause