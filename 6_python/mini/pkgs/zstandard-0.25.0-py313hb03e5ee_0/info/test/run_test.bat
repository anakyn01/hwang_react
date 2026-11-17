

@echo on

pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
python -c "from importlib.metadata import version; assert(version('zstandard')=='0.25.0')"
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -vv --deselect=tests/test_module_attributes.py::TestModuleAttributes::test_features tests
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
