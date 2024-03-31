#!/usr/bin/env python3
from pyresparser import ResumeParser
# from resume_parser import resumeparse
import sys
import warnings
import json
warnings.filterwarnings("ignore")

def parse_resume(file_path):
    # Parse the resume file
    data = ResumeParser(file_path).get_extracted_data()
    # data = resumeparse.read_file(file_path)

   
    # Print the extracted information
    # print("\nExtracted Information:")
    # for key, value in data.items():
    #     print(f"{key}: {value}")

    return data


def main():
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
        extracted_data = parse_resume(file_path)
        print(json.dumps(extracted_data))
    else:
        print("Error: No file path provided.")

if __name__ == "__main__":
    main()
   