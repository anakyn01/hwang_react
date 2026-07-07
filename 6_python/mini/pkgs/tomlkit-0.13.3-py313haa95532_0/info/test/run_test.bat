



pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
python -c "from importlib.metadata import version; assert(version('tomlkit')=='0.13.3')"
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -ra -v --tb=short tests
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
