



pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest --pyargs win32ctypes.tests  --deselect=test_win32cred.py::TestCred::test_enumerate_all
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
