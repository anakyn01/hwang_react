

@echo on

pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
typer --version
IF %ERRORLEVEL% NEQ 0 exit /B 1
typer --help
IF %ERRORLEVEL% NEQ 0 exit /B 1
cd typer && coverage run --source=typer --branch -m pytest -vv --color=yes --tb=long -k "not ((multiple_values and main) or completion or invalid_score)"  --deselect=tests/test_tutorial/test_exceptions/test_tutorial003.py::test_traceback_rich_pretty_short_disable
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
