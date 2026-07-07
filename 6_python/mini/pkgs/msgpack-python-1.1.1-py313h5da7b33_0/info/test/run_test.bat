



pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
python -c "from importlib.metadata import version; assert(version('msgpack')=='1.1.1')"
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -v test
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
