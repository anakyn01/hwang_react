@ECHO ON

:: Pip check
"%PYTHON%" -m pip check
IF %ERRORLEVEL% NEQ 0 EXIT /B %ERRORLEVEL%

:: Create a .nonadmin file so that the menuinst tests
:: do not try to run with admin privileges
echo. > "%PREFIX%\.nonadmin"
IF %ERRORLEVEL% NEQ 0 EXIT /B %ERRORLEVEL%

:: Run tests only if Python is NOT 3.14
if not "%PYTHON_VERSION%"=="3.14" (
    echo Running tests for Python %PYTHON_VERSION%
    :: Cannot run tests in test_schema.py because hypothesis-jsonschema is not on defaults
    :: Cannot run others because privilege elevation is not possible on the build platform
    pytest tests\ -vvv --ignore=tests\test_schema.py --ignore=tests\test_elevation.py -k "not test_create_and_remove_shortcut"
    if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%
) else (
    echo Skipping tests on Python 3.14+
)