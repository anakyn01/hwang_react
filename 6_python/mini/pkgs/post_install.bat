@ECHO OFF

REM Let attribution fail silently to avoid
REM installation failures and/or confusing messages.
"%PREFIX%\python.exe" "%INSTALLER_PLUGINSDIR%\read_attribution_data.py" ^
  "%INSTALLER_PATH%" --prefix "%PREFIX%" > NUL 2>&1
exit /b 0
