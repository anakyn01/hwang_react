



pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest tests.py
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
