



pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
python -c "from importlib.metadata import version; assert(version('readchar')=='4.2.1')"
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -v tests/windows
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
