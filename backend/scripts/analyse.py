import sys
# import textract
from PyPDF2 import PdfReader
import json
import pickle
import os
import nltk
from nltk.corpus import stopwords
from nltk.stem.snowball import SnowballStemmer


import re
os.chdir('C:/Users/ompat/OneDrive/Desktop/resume_parser/backend/scripts')
def cleanResume(txt):
    st = SnowballStemmer('english')

    # Define the stopwords
    stop_words = set(stopwords.words('english'))
    txt = txt.lower()
    # Remove extra spaces
    txt = re.sub(' +', ' ', txt)
    # Remove punctuation
    txt = re.sub('[^a-zA-Z]', ' ', txt)
    # Remove stopwords and stem
    txt = ' '.join(word for word in txt.split() if word not in stop_words)
    return txt
    # cleanText = re.sub('http\S+\s', ' ', txt)
    # cleanText = re.sub('RT|cc', ' ', cleanText)
    # cleanText = re.sub('#\S+\s', ' ', cleanText)
    # cleanText = re.sub('@\S+', '  ', cleanText)  
    # cleanText = re.sub('[%s]' % re.escape("""!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""), ' ', cleanText)
    # cleanText = re.sub(r'[^\x00-\x7f]', ' ', cleanText) 
    # cleanText = re.sub('\s+', ' ', cleanText)
    # return cleanText
# Load the trained classifier
clf = pickle.load(open('clf.pkl', 'rb'))
tfidf = pickle.load(open('tfidf.pkl', 'rb'))

# Assuming the file path is passed as the first command-line argument
file_path = sys.argv[1]

# Extract text from the PDF
reader = PdfReader(file_path)
text = ''
for x in range(len(reader.pages)):
    page = reader.pages[x]
    text += page.extract_text()

# print(text)
# Clean the input resume (implement the cleanResume function as needed)



cleaned_resume = cleanResume(text)


# Transform the cleaned resume using the trained TfidfVectorizer
# Assuming tfidfd is already defined and trained
input_features = tfidf.transform([cleaned_resume])

# Make the prediction using the loaded classifier
prediction_id = clf.predict(input_features)[0]

# Map category ID to category name
category_mapping = {
    15: "Java Developer",
    23: "Testing",
    8: "DevOps Engineer",
    20: "Python Developer",
    24: "Web Designing",
    12: "HR",
    13: "Hadoop",
    3: "Blockchain",
    10: "ETL Developer",
    18: "Operations Manager",
    6: "Data Science",
    22: "Sales",
    16: "Mechanical Engineer",
    1: "Arts",
    7: "Database",
    11: "Electrical Engineering",
    14: "Health and fitness",
    19: "PMO",
    4: "Business Analyst",
    9: "DotNet Developer",
    2: "Automation Testing",
    17: "Network Security Engineer",
    21: "SAP Developer",
    5: "Civil Engineer",
    0: "Advocate",
}

category_name = category_mapping.get(prediction_id, "Unknown")

# Print the prediction category name to stdout
send_data = {
    "category": category_name,
    "text": cleaned_resume
}

# Print the dictionary to stdout
print(json.dumps(send_data))