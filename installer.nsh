!macro customInstall DetailPrint "Register test URI Handler" DeleteRegKey HKCR "test" WriteRegStr HKCR "test" "" "URL:test" WriteRegStr HKCR "test" "URL Protocol" "" WriteRegStr HKCR "test\shell" "" "" WriteRegStr HKCR "test\shell\Open" "" "" WriteRegStr HKCR "test\shell\Open\command" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME} %1" !macroend

