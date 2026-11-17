@ECHO OFF
IF "%UNINSTALLER_REMOVE_USER_DATA%" == "1" (
  IF EXIST "%USERPROFILE%\.anaconda" (
    RMDIR /Q /S "%USERPROFILE%\.anaconda"
  )
)
