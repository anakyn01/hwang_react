



IF NOT EXIST "%PREFIX%\\Menu\\anaconda_prompt_menu.json" EXIT 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
IF NOT EXIST "%PREFIX%\\Menu\\anaconda_prompt.ico" EXIT 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
