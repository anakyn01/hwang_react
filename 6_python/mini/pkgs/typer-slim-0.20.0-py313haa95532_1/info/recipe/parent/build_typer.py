"""Handle custom (custom) build chain for `typer(-(slim|cli))`"""
import os
import sys
from subprocess import call
from pathlib import Path

PKG_NAME = os.environ["PKG_NAME"]
PKG_SRC = Path(os.environ["SRC_DIR"]) / PKG_NAME

def pym(*args):
    args = [*map(str, args)]
    print(">>>", *args, flush=True)
    env = {
        **os.environ,
        # see https://github.com/tiangolo/typer/blob/0.12.1/pdm_build.py
        "TIANGOLO_BUILD_PACKAGE": PKG_NAME,
    }

    call([sys.executable, "-m", *args], cwd=str(PKG_SRC), env=env)

def main():
    pym("build", "--no-isolation", "--wheel", ".")
    pym(
        "pip",
        "install",
        "-vvv",
        "--no-deps",
        "--disable-pip-version-check",
        "--find-links=dist",
        "--no-index",
        PKG_NAME
    )

if __name__ == "__main__":
    main()