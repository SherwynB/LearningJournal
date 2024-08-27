@ECHO OFF

cl.exe /nologo /Ox /MT /W0 /GS- /DNDEBUG /TcsimpleShellCode.cpp /link /OUT:simpleShellCode.exe /SUBSYSTEM:CONSOLE /MACHINE:x64