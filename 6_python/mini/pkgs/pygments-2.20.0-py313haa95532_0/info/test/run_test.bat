

@echo on

pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
pygmentize -h
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -v tests  --ignore=tests/contrast/test_contrasts.py  --deselect=tests/test_basic_api.py::test_lexer_classes
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
