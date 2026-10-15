

@echo on

pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
conda info
IF %ERRORLEVEL% NEQ 0 exit /B 1
conda info --json
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
