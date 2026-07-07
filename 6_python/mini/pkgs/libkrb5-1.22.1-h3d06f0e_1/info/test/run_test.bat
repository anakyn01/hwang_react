

@echo on

echo on
IF %ERRORLEVEL% NEQ 0 exit /B 1
if exist "%PREFIX%\\Library\\bin\\krb5_64.dll" (exit 0) else (exit 1)
IF %ERRORLEVEL% NEQ 0 exit /B 1
if exist "%PREFIX%\\Library\\include\\krb5.h" (exit 0) else (exit 1)
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
