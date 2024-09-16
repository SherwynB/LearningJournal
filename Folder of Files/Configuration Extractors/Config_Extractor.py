# Import the pefile library for working with PE files
import pefile

def extract_and_check_sections(filename):
  """
  This function opens a PE file, checks for the byte sequence 0x90 0x90 0xcc
  in the .rdata and .txt sections, and returns information about it.

  Args:
      filename (str): The path to the PE file.

  Returns:
      tuple: A tuple containing three elements:
          - sequence_found (bool): True if the sequence is found, False otherwise.
          - found_section (str): The name of the section where the sequence is found, or None if not found.
          - found_address (int): The memory address of the sequence within the section, or None if not found.
  """

  try:
    # Open the PE file using the pefile library
    pe = pefile.PE(filename)

    # Initialize variables to track findings
    sequence_found = False
    found_section = None
    found_address = None

    # Loop through each section in the PE file
    for section in pe.sections:
      # Get the data from the current section
      section_data = section.get_data()

      # Search for the byte sequence (0x90 0x90 0xcc) within the section data
      offset = section_data.find(b'\x90\x90\xcc')

      # If the sequence is found (offset != -1)
      if offset != -1:
        # Update flags and information about the sequence
        sequence_found = True
        found_section = section.Name.decode('utf-8')  # Decode section name
        found_address = section.PointerToRawData + offset  # Calculate memory address
        # Break out of the loop since the sequence is already found
        break

    # Return the findings about the sequence
    return sequence_found, found_section, found_address

  except pefile.PEFormatError:
    # Handle errors if the file is not a valid PE file
    print(f"Error: {filename} is not a valid PE file.")
    # Return default values indicating no sequence found
    return False, None, None

def main():

  # Get the PE file name from the user
  filename = input("Enter PE file name: ")

  # Call the extract_and_check_sections function to analyze the file
  sequence_found, found_section, found_address = extract_and_check_sections(filename)

  # Display results based on whether the sequence was found
  if sequence_found:
    print(f"The byte sequence is found in the {found_section} section at memory address 0x{found_address:x}.")
  else:
    print("The byte sequence is not found in any section.")

if __name__ == "__main__":
  # This block ensures the main function only runs when the script is executed directly
  main()