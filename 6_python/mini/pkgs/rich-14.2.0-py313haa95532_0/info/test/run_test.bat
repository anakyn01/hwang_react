



pip check
IF %ERRORLEVEL% NEQ 0 exit /B 1
pytest -vv tests -k "not (test_markdown_render or test_syntax_highlight_ranges or test_option_no_wrap or test_python_render or test_card_render or test_brokenpipeerror or test_background_color_override_includes_padding)"
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
