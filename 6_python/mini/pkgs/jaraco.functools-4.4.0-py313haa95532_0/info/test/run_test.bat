



pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -vv test_functools.py -k "not test_function_throttled"
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
