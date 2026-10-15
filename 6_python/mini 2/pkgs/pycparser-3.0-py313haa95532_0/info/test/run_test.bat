

@echo on

pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
python -c "from importlib.metadata import version; assert(version('pycparser')=='3.0')"
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest --rootdir=. -vv tests
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
