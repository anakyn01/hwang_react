



pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
python -c "from importlib.metadata import version; assert(version('markdown-it-py')=='4.0.0')"
IF %ERRORLEVEL% NEQ 0 exit /B 1
set PYTHONUTF8=1
IF %ERRORLEVEL% NEQ 0 exit /B 1
set PYTHONIOENCODING="UTF-8"
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -k "not(test_commonmark_extras or test_table_tokens or test_file or test_use_existing_env or test_store_labels or test_inline_definitions or test_pretty or test_pretty_text_special)" -v gh/tests
IF %ERRORLEVEL% NEQ 0 exit /B 1
markdown-it --help
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
