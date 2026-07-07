

@echo on

pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
python -c "from pydantic_core import PydanticUndefinedType"
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -vv -W default::pytest.PytestUnknownMarkWarning
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
