



echo [pytest] > pytest.ini
IF %ERRORLEVEL% NEQ 0 exit /B 1
echo doctest_optionflags = NORMALIZE_WHITESPACE IGNORE_EXCEPTION_DETAIL ELLIPSIS ALLOW_UNICODE >> pytest.ini
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -vv --doctest-modules boltons tests -k "not test_reverse_iter_lines"
IF %ERRORLEVEL% NEQ 0 exit /B 1
pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
