



pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
python -c "from importlib.metadata import version; assert(version('urllib3')=='2.6.3')"
IF %ERRORLEVEL% NEQ 0 exit /B 1
cd test && pytest -v test_collections.py test_compatibility.py test_connection.py test_connectionpool.py test_exceptions.py test_fields.py test_filepost.py test_http2_connection.py test_no_ssl.py test_poolmanager.py test_proxymanager.py test_queue_monkeypatch.py test_response.py test_retry.py test_ssl.py test_util.py test_wait.py tz_stub.py
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
