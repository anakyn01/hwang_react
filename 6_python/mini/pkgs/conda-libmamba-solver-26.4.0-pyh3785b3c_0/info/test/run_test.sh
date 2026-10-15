

set -ex



python -c "from importlib.metadata import version; assert(version('conda-libmamba-solver')=='26.4.0')"
CONDA_SOLVER=libmamba conda create -n test --dry-run scipy
conda create --solver libmamba -n test --dry-run scipy
exit 0
