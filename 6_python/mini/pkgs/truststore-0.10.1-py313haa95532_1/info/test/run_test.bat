



pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -k "not (test_failures or test_failure_after_loading_additional_anchors)" tests/
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
