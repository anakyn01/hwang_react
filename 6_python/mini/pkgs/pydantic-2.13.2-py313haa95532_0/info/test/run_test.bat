

@echo on

pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
python -c "from importlib.metadata import version; assert(version('pydantic')=='2.13.2')"
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -ra -vv --tb=short tests  --ignore=tests/test_docs.py  --deselect=tests/test_types_typeddict.py::test_readonly_qualifier_warning
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
