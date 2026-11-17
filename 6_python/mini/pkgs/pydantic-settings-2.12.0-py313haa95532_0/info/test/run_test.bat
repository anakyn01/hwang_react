



pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -v tests --ignore=tests/test_docs.py --ignore=tests/test_source_cli.py -k "not test_symlink_subdir"
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
