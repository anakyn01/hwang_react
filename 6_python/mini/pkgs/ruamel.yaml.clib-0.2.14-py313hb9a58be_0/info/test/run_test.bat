



python -c "from importlib.util import find_spec; assert find_spec('_ruamel_yaml')"
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
