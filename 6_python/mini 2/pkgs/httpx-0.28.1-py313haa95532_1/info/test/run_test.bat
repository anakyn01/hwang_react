



pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
set PYTHONIOENCODING=utf8
IF %ERRORLEVEL% NEQ 0 exit /B 1
httpx --help
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -vv tests -k "not ( test_socks_proxy_deprecated or test_socks_proxy or test_multipart_encode_files_raises_exception_with_text_mode_file or test_write_timeout or test_get[asyncio] or test_logging_ssl or test_get_ssl_cert_file)"
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
