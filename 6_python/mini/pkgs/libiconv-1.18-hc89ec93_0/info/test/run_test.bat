

@echo on

if exist %LIBRARY_PREFIX%\bin\iconv.exe exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if exist "%LIBRARY_PREFIX%\share\man\man3\iconv*" exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if exist "%LIBRARY_PREFIX%\share\doc\iconv*" exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_PREFIX%\lib\iconv.lib exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_PREFIX%\lib\charset.lib exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_PREFIX%\bin\iconv.dll exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_PREFIX%\bin\charset.dll exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
pkg-config --help
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
