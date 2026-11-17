

@echo on

pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
anaconda -h
IF %ERRORLEVEL% NEQ 0 exit /B 1
anaconda -V
IF %ERRORLEVEL% NEQ 0 exit /B 1
python -c "from anaconda_cli_base import __version__; assert __version__ == \"0.8.2\""
IF %ERRORLEVEL% NEQ 0 exit /B 1
python -c "from importlib.metadata import version; assert(version('anaconda-cli-base')=='0.8.2')"
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -v tests
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
