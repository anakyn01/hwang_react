$Env:CONDA_EXE = "C:\Users\task_177585125271105\croot\conda_1775852147789\_h_env\Scripts\conda.exe"
$Env:_CONDA_EXE = "C:\Users\task_177585125271105\croot\conda_1775852147789\_h_env\Scripts\conda.exe"
$Env:_CE_M = $null
$Env:_CE_CONDA = $null
$Env:CONDA_PYTHON_EXE = "C:\Users\task_177585125271105\croot\conda_1775852147789\_h_env\python.exe"
$Env:_CONDA_ROOT = "C:\Users\task_177585125271105\croot\conda_1775852147789\_h_env"
$CondaModuleArgs = @{ChangePs1 = $True}

Import-Module "$Env:_CONDA_ROOT\shell\condabin\Conda.psm1" -ArgumentList $CondaModuleArgs

Remove-Variable CondaModuleArgs