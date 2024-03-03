#!/usr/bin/env python3

import sys

def main():
    # Check if a file path is provided as an argument
    if len(sys.argv) > 1:
        print("Dummy text from Python script: This is a dummy text for demonstration purposes.")
    else:
        print("Error: No file path provided.")

if __name__ == "__main__":
    main()