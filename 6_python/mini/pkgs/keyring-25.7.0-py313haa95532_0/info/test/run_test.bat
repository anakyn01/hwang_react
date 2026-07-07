



pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
py.test -v tests
IF %ERRORLEVEL% NEQ 0 exit /B 1
keyring --help
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
