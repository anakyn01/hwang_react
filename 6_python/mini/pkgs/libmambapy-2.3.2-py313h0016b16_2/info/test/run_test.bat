

@echo on

python -c "import libmambapy.version; assert libmambapy.version.__version__ == '2.3.2'"
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
