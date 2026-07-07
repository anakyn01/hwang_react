



pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
python -c "from importlib.metadata import version; assert(version('brotlicffi')=='1.2.0.0')"
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
