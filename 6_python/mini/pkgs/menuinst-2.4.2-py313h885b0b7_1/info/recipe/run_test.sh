#!/bin/bash
set -euxo pipefail

# Pip check
$PYTHON -m pip check

# Verify launcher files are present on macOS
if [[ "$(uname)" == "Darwin" ]]; then
    SP_DIR="$(python -c 'import site; print(site.getsitepackages()[0])')"
    test -f "${SP_DIR}/menuinst/data/appkit_launcher_arm64"
    test -f "${SP_DIR}/menuinst/data/appkit_launcher_x86_64"
    test -f "${SP_DIR}/menuinst/data/osx_launcher_arm64"
    test -f "${SP_DIR}/menuinst/data/osx_launcher_x86_64"
fi


if [[ "$PYTHON_VERSION" < "3.14" ]]; then
    # Run tests
    # Cannot run tests in test_schema.py because hypothesis-jsonschema is not on defaults
    # Cannot run others because privilege elevation is not possible on the build platform
    pytest tests/ -vvv --ignore=tests/test_schema.py --ignore=tests/test_elevation.py
else
    echo Skipping tests on Python 3.14+
fi