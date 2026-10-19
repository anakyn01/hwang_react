$Env:CONDA_EXE = "D:/hwang_react/6_python/mini\Scripts\conda.exe"
$Env:_CONDA_EXE = "D:/hwang_react/6_python/mini\Scripts\conda.exe"
$Env:_CE_M = $null
$Env:_CE_CONDA = $null
$Env:CONDA_PYTHON_EXE = "D:/hwang_react/6_python/mini\python.exe"
$Env:_CONDA_ROOT = "D:/hwang_react/6_python/mini"
$CondaModuleArgs = @{ChangePs1 = $True}

Import-Module "$Env:_CONDA_ROOT\shell\condabin\Conda.psm1" -ArgumentList $CondaModuleArgs

Remove-Variable CondaModuleArgs