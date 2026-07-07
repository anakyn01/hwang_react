

@echo on

python -c "from importlib.metadata import version; assert(version('conda-libmamba-solver')=='26.4.0')"
IF %ERRORLEVEL% NEQ 0 exit /B 1
CONDA_SOLVER=libmamba conda create -n test --dry-run scipy
IF %ERRORLEVEL% NEQ 0 exit /B 1
conda create --solver libmamba -n test --dry-run scipy
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
