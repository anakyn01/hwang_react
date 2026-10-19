



pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
tqdm --help
IF %ERRORLEVEL% NEQ 0 exit /B 1
tqdm -v | rg 4.67.3
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -k "not tests_perf" tests/ -W ignore::FutureWarning  --deselect=tests/tests_main.py::test_pipes --deselect=tests/tests_pandas.py::test_pandas_leave
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
