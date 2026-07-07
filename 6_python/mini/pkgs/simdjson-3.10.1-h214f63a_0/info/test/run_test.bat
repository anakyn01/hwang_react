



if not exist %LIBRARY_INC%\simdjson.h (exit 1)
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_BIN%\simdjson.dll (exit 1)
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_LIB%\simdjson.lib (exit 1)
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_LIB%\cmake\simdjson\simdjson-config.cmake (exit 1)
IF %ERRORLEVEL% NEQ 0 exit /B 1
cmake -G Ninja -S test/ -B build/ -D TEST_TARGET=simdjson -DCMAKE_BUILD_TYPE=Release %CMAKE_ARGS%
IF %ERRORLEVEL% NEQ 0 exit /B 1
cmake --build build/
IF %ERRORLEVEL% NEQ 0 exit /B 1
cmake --build build --target test
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
