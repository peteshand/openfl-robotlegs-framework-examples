@echo off
set PAUSE_ERRORS=1
call bat\SetupSDK.bat
call bat\SetupApplication.bat

echo.
echo Starting AIR Debug Launcher...
echo.

:: use this line if you are NOT using a native extension
adl "%APP_XML%" "%APP_DIR%"
:: use this line if you are using a native extension
::adl "%APP_XML%" "%APP_DIR%" -extdir ./extension/
if errorlevel 1 goto error
goto end

:error
pause

:end