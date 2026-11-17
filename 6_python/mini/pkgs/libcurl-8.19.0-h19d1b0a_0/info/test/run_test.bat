

@echo on

if exist %LIBRARY_BIN%\curl.exe exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_BIN%\libcurl.dll exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_LIB%\libcurl.lib exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_LIB%\pkgconfig\libcurl.pc exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
