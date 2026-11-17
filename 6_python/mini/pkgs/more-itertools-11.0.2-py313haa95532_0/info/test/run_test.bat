

@echo on

pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
python -c "from importlib.metadata import version; assert(version('more-itertools')=='11.0.2')"
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -v tests
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
