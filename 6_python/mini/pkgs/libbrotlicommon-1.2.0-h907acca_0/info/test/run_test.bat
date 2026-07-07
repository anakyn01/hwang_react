



if not exist %LIBRARY_BIN%\\brotlicommon.dll exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_LIB%\\brotlicommon.lib exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if exist %LIBRARY_LIB%\\brotlicommon-static.lib exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
