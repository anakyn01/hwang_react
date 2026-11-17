



pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
python -c "from importlib.metadata import version; assert(version('idna')=='3.11')"
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -v tests
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
