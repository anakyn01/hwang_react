



if not exist %LIBRARY_PREFIX%\include\nlohmann\json.hpp (exit 1)
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_PREFIX%\include\nlohmann\json_fwd.hpp (exit 1)
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_PREFIX%\share\cmake\nlohmann_json\nlohmann_jsonConfig.cmake (exit 1)
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_PREFIX%\share\cmake\nlohmann_json\nlohmann_jsonConfigVersion.cmake (exit 1)
IF %ERRORLEVEL% NEQ 0 exit /B 1
if not exist %LIBRARY_PREFIX%\share\cmake\nlohmann_json\nlohmann_jsonTargets.cmake (exit 1)
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
