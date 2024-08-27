@ECHO OFF

cl.exe /D_USRDLL /D_WINDLL myDLL.cpp /MT /link /DLL /OUT:myDLL.dll
