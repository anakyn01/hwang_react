



pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
python -c "from importlib.metadata import version; assert(version('mdurl')=='0.1.2')"
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -v gh/tests
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
