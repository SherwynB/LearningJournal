#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <windows.h>

int main (void)
{
	void * alloc_mem;
	BOOL retval;
	HANDLE threadHandle;
	DWORD oldProtect = 0;
	
	//length of shellcode payload
	unsigned int scPayloadLength = 4;
	
	//payload
	unsigned char shellcodePayload [] = {
	0x90,
	0x90,
	0xcc,
	0xc3
	};
	
	
	//memory allocation
	alloc_mem = VirtualAlloc(0, scPayloadLength, MEM_COMMIT | MEM_RESERVE, PAGE_READWRITE );
	printf("%-20s : 0x%-16p\n", "Shellcode Address", (void *)shellcodePayload);
	printf("%-20s : 0x%-16p\n", "Allocated Memory Address", (void *)alloc_mem);
	
	//Copy Shellcode
	RtlMoveMemory(alloc_mem, shellcodePayload, scPayloadLength);
	
	//set to executable
	retval = VirtualProtect(alloc_mem, scPayloadLength, PAGE_EXECUTE_READ, &oldProtect);
	printf("Press any key to create thread");
	getchar();
	
	
	//
	if (retval !=0)
	{
		threadHandle = CreateThread(0,0, (LPTHREAD_START_ROUTINE) alloc_mem, 0,0,0);
		WaitForSingleObject(threadHandle, -1);
	}
	
	return 0;
}
