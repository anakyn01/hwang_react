



pcre2test --version
IF %ERRORLEVEL% NEQ 0 exit /B 1
pcre2grep --version
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_INC%\\pcre2.h exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_INC%\\pcre2posix.h exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_BIN%\\pcre2-8.dll exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_BIN%\\pcre2-16.dll exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_BIN%\\pcre2-32.dll exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_BIN%\\pcre2-posix.dll exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_LIB%\\pcre2-8.lib exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_LIB%\\pcre2-16.lib exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_LIB%\\pcre2-32.lib exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_LIB%\\pcre2-posix.lib exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_LIB%\\pkgconfig\\libpcre2-posix.pc exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_LIB%\\pkgconfig\\libpcre2-8.pc exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_LIB%\\pkgconfig\\libpcre2-16.pc exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_LIB%\\pkgconfig\\libpcre2-32.pc exit 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
