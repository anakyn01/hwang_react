

@echo on

pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
python -c "from anaconda_auth import __version__; assert __version__ == '0.14.2'"
IF %ERRORLEVEL% NEQ 0 exit /B 1
python -m anaconda_auth._conda.config --verify
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
