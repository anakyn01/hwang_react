



pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
python -c "import jaraco.classes.properties as p; assert hasattr(p, 'NonDataProperty')"
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -v --color=yes test_jaraco_classes.py
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
