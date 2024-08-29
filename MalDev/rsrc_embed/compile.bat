@ECHO OFF

rc rsrc.rc
cvtres /MACHINE:x64 /OUT:rsrc.o rsrc.res
cl.exe /nologo /Ox /MT /W0 /GS- /DNDEBUG /Tcrsrc.cpp /link /OUT:rsrc.exe /SUBSYSTEM:CONSOLE /MACHINE:x64 rsrc.o