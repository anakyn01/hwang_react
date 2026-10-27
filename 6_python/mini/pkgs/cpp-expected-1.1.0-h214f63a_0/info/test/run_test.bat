



if not exist %LIBRARY_INC%\tl\expected.hpp (exit 1)
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_PREFIX%\share\cmake\tl-expected\tl-expected-config.cmake (exit 1)
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_PREFIX%\share\cmake\tl-expected\tl-expected-config-version.cmake (exit 1)
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
