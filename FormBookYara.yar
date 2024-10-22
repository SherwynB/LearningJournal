rule myFormBook {
    // This is the code snippet from the assembly loading the second stage.
    // private void ProcessData(byte[] inputData, byte[] outputData, uint[] stateArray)
    // {
    //     uint i = 0U; // Initialize index for stateArray
    //     uint j = 0U; // Second index for stateArray
    //     for (int index = 0; index < inputData.Length; index++) // Loop through input data
    //     {
    //         i = (i + 1U) & 255U; // Increment i and wrap around using 255
    //         j = (j + stateArray[(int)i]) & 255U; // Update j based on stateArray[i]
    //         this.Swap(ref stateArray[(int)i], ref stateArray[(int)j]); // Swap stateArray values
    //         uint keyStreamValue = (stateArray[(int)i] + stateArray[(int)j]) & 255U; // Calculate key stream
    //         outputData[index] = (byte)((uint)inputData[index] ^ stateArray[(int)keyStreamValue]); // XOR operation
    //     }
    // }

    meta:
        description = "Second Stage Loading of Formbook Sample"
		author = "Sherwyn B"
        date = "2024-10-22"
        sha256 = "3a259b8cfd64e2e3086299d3038714dbbf4c41dcbb81b222c6b0e5ab979f75d3"

    strings:
        $MZ = { 4D 5A }
        $opcode1 = { 00 16 0A 16 0B 16 0C 2B 4A 00 06 17 58 20 FF 00 00 00 }
        $opcode2 = { 5F 0A 07 05 06 95 58 20 FF 00 00 00 5F 0B 02 05 06 }
        $opcode3 = { 8F 8E 00 00 01 05 07 8F 8E 00 00 01 28 5E 00 00 06 }
        $opcode4 = { 00 05 06 95 05 07 95 58 20 FF 00 00 00 5F 0D 04 08 }
        $opcode5 = { 03 08 91 05 09 95 61 D2 9C 00 08 17 58 0C 08 03 8E }
        $opcode6 = { 69 FE 04 13 04 11 04 2D AA 2A }

    condition:
        ($MZ) and (all of ($opcode*))
}
