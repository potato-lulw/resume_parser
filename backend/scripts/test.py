#!/usr/bin/env python3
from pyresparser import ResumeParser
# from resume_parser import resumeparse
import sys
import warnings
warnings.filterwarnings("ignore")

def parse_resume(file_path):
    # Parse the resume file
    data = ResumeParser(file_path).get_extracted_data()
    # data = resumeparse.read_file(file_path)

    print(file_path)
    # Print the extracted information
    print("Extracted Information:")
    for key, value in data.items():
        print(f"{key}: {value}")

def main():
    # Check if a file path is provided as an argument
    if len(sys.argv) > 1:
        # print("Dummy text from Python script: This is a dummy text for demonstration purposes.")
        file_path = sys.argv[1]
        parse_resume(file_path)
    else:
        print("Error: No file path provided.")

if __name__ == "__main__":
    main()
   