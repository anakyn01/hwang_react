



pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -v test  --deselect=test/test_frozendict_subclass.py::TestFrozendictSubclass::test_copycopy_sub
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
