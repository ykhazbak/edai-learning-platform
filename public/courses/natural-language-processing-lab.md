---
id: 5
title: "Natural Language Processing Lab"
description: "Work with language models and build applications like chatbots and sentiment analyzers."
difficulty: "Advanced"
duration: "10 Weeks"
image: "/images/courses/natural-language-processing-lab.jpg"
level: "Advanced"
projects: 6
students: 450
rating: 4.8
category: "NLP"
tags: ["NLP", "Transformers", "spaCy", "Hugging Face"]
featured: false
date: "2024-07-18"
---

## Course Overview

This lab is all about teaching computers to understand and generate human language. You'll work with cutting-edge models and build practical NLP applications from the ground up.

### What You'll Build

-   A chatbot that can answer questions about a specific topic.
-   A sentiment analysis tool to gauge opinions on social media.
-   An automatic text summarizer.
-   A language translation model.
---

## Week 1: Text Processing and Word Embeddings

Before we build complex models, we need to understand how to process and represent text in a way that computers can understand.

### Your NLP Toolkit
We'll use a few key libraries:
-   **NLTK (Natural Language Toolkit):** A foundational library for NLP tasks.
-   **spaCy:** A modern and efficient library for industrial-strength NLP.
-   **Gensim:** For topic modeling and word vector comparisons.
-   **scikit-learn:** For its feature extraction tools.

Install them:
`pip install nltk spacy gensim scikit-learn`
And download necessary models:
`python -m spacy download en_core_web_sm`
`python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"`


### Project 1: Building a Text Similarity Calculator
Let's create a tool that can tell you how similar two sentences are. We'll use a technique called TF-IDF (Term Frequency-Inverse Document Frequency), which measures the importance of a word in a document.

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

documents = [
    "AI is transforming the world.",
    "Artificial intelligence is a revolutionary technology.",
    "The sky is blue and the sun is bright.",
    "Machine learning, a subset of AI, is very powerful."
]

# Create the TF-IDF vectorizer
tfidf_vectorizer = TfidfVectorizer()

# Generate the TF-IDF matrix
tfidf_matrix = tfidf_vectorizer.fit_transform(documents)

# Calculate cosine similarity between the first document and all others
cosine_similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix)

# Print the results
for i, score in enumerate(cosine_similarities[0]):
    print(f"Similarity between doc 1 and doc {i+1}: {score:.4f}")

```
**Hands-on Challenge:**
- **Critical Thinking:** Look at the results. Why is document 2 most similar? Why is document 3 the least similar? TF-IDF is based on word counts. What are the limitations of this approach? What if a sentence uses synonyms (e.g., "intelligent" vs. "smart")?

### Word Embeddings with spaCy
TF-IDF is good, but it doesn't understand the *meaning* of words. **Word embeddings** (like Word2Vec or GloVe) represent words as dense vectors where similar words are closer together in the vector space.

```python
import spacy

# Load the medium-sized English model with word vectors
nlp = spacy.load("en_core_web_sm")

doc1 = nlp("The king is a powerful ruler.")
doc2 = nlp("The queen is a wise leader.")
doc3 = nlp("I ate a delicious pizza for lunch.")

# Get the similarity between docs
print(f"Similarity between doc1 and doc2: {doc1.similarity(doc2):.4f}")
print(f"Similarity between doc1 and doc3: {doc1.similarity(doc3):.4f}")

# You can also check similarity of individual words (tokens)
token_king = nlp("king")[0]
token_queen = nlp("queen")[0]
token_pizza = nlp("pizza")[0]
print(f"Similarity between 'king' and 'queen': {token_king.similarity(token_queen):.4f}")
print(f"Similarity between 'king' and 'pizza': {token_king.similarity(token_pizza):.4f}")
```

---

## Week 2: Sentiment Analysis

Let's teach a machine to understand emotions in text.

### Project 2: Building a Basic Sentiment Analyzer
We'll build a model to classify text as positive or negative. We'll use a simple approach with scikit-learn's machine learning pipelines.

```python
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score

# Sample data (in a real project, you'd use a large dataset)
reviews = [
    ("I loved the movie, it was amazing!", "positive"),
    ("The film was a complete waste of time.", "negative"),
    ("What a fantastic and brilliant performance.", "positive"),
    ("I would not recommend this to anyone.", "negative"),
    ("The acting was superb and the plot was great.", "positive"),
    ("It was boring and predictable.", "negative")
]

texts, labels = zip(*reviews)

# Split data
X_train, X_test, y_train, y_test = train_test_split(texts, labels, test_size=0.3, random_state=42)

# Create a pipeline
vectorizer = CountVectorizer()
X_train_counts = vectorizer.fit_transform(X_train)

# Train a Naive Bayes classifier
model = MultinomialNB()
model.fit(X_train_counts, y_train)

# Test the model
X_test_counts = vectorizer.transform(X_test)
y_pred = model.predict(X_test_counts)

print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")

# Test with a new sentence
new_review = ["The movie was a masterpiece."]
new_review_counts = vectorizer.transform(new_review)
print(f"Prediction for '{new_review[0]}': {model.predict(new_review_counts)[0]}")
```

**Hands-on Challenge:**
- **Critical Thinking:** Our model works on single words ("unigrams"). What about phrases? The phrase "not good" is negative, but the model might see "not" and "good" as separate tokens. How could you solve this? (Hint: Look at the `ngram_range` parameter in `CountVectorizer`).
- This model is very simple. For a real-world task, you would use a much larger dataset (like the IMDB reviews from the fundamentals course) and a more powerful model, like an LSTM or a Transformer.

---

## Week 3: Introduction to Transformers and Hugging Face

This week, we jump to the cutting edge of NLP: the Transformer architecture and the Hugging Face library.

### What are Transformers?
Transformers are a modern neural network architecture that has revolutionized NLP. They are particularly good at understanding context in language. Models like BERT, GPT, and T5 are all Transformers.

### The Hugging Face Ecosystem
Hugging Face provides a library (`transformers`) that makes it incredibly easy to download and use thousands of pre-trained Transformer models.

`pip install transformers`

### Project 3: Question Answering with a Pre-trained Model
Let's build a program that can answer questions based on a given context, using a pre-trained BERT model.

```python
from transformers import pipeline

# Load the question-answering pipeline
qa_pipeline = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

context = """
Artificial intelligence (AI) is intelligence demonstrated by machines,
as opposed to the natural intelligence displayed by humans and animals.
Leading AI textbooks define the field as the study of "intelligent agents":
any device that perceives its environment and takes actions that maximize its chance of
successfully achieving its goals.
"""

question = "What is the definition of AI?"

result = qa_pipeline(question=question, context=context)

print(f"Answer: '{result['answer']}'")
print(f"Score: {result['score']:.4f}")

question_2 = "What do AI textbooks define the field as?"
result_2 = qa_pipeline(question=question_2, context=context)
print(f"Answer: '{result_2['answer']}'")
print(f"Score: {result_2['score']:.4f}")
```

**Hands-on Challenge:**
- **Critical Thinking:** This seems like magic! How does it work? Research the high-level architecture of models like BERT. It uses an "Encoder" part of the Transformer to read and understand the context and question together.
- Go to the [Hugging Face Hub](https://huggingface.co/models) and explore other models. Try replacing `"distilbert-base-cased-distilled-squad"` with another question-answering model. Do you get different answers or scores?
- Try another "pipeline", like `"text-generation"` or `"summarization"`.

---

## Week 4: Building a Simple Chatbot

Let's build a simple, rule-based chatbot. While not as advanced as a Transformer model, it's a great way to understand the fundamentals of conversational AI.

### Project 4: A Regex-based Chatbot
We'll use regular expressions (regex) to find patterns in user input and respond accordingly.

```python
import re

def simple_chatbot(user_input):
    # Define rules as a list of tuples (pattern, response)
    rules = [
        (r'hi|hello|hey', "Hello there! How can I help you today?"),
        (r'how are you', "I'm just a bot, but I'm doing great! Thanks for asking."),
        (r'what is your name', "You can call me ChatterBot."),
        (r'.* your name is .*', "Pleased to meet you!"),
        (r'.* (weather|temperature) .*', "I'm sorry, I can't check the weather. I'm not connected to the internet."),
        (r'bye|goodbye', "Goodbye! Have a great day."),
        (r'.*', "I'm not sure how to respond to that. Can you ask me something else?") # Default rule
    ]
    
    for pattern, response in rules:
        if re.search(pattern, user_input, re.IGNORECASE):
            return response

# Main loop
print("ChatterBot: Hello! Type 'bye' to exit.")
while True:
    user_text = input("You: ")
    if user_text.lower() == 'bye':
        print("ChatterBot: Goodbye!")
        break
    response = simple_chatbot(user_text)
    print(f"ChatterBot: {response}")

```

**Hands-on Challenge:**
- **Critical Thinking:** This bot is very limited. What are its main weaknesses? (e.g., doesn't remember conversation history, rigid patterns).
- **Extend the bot!** Add more rules. Can you make a rule that extracts the user's name and uses it in a response? (Hint: Use regex capturing groups).
- How would a deep learning chatbot (like one based on GPT) be different? It would *generate* responses instead of picking from a pre-defined list, allowing for much more flexible and human-like conversation.

---

## Week 5: Capstone: Text Summarizer

For your capstone, you will build a tool that can summarize a long piece of text.

### Your Mission
Create a script that takes a long article as input and outputs a concise summary. You can approach this in two ways:

1.  **Extractive Summarization (Easier):** The system identifies the most important sentences from the original text and combines them to form a summary.
2.  **Abstractive Summarization (Harder):** The system generates *new* sentences that capture the meaning of the original text. This is what modern Transformer models do.

### Approach 1: Extractive Summarizer with spaCy
1.  Process the text with spaCy.
2.  Calculate the frequency of each word (after removing stopwords).
3.  Score each sentence based on the frequency of the words it contains.
4.  Select the top N sentences with the highest scores.

### Approach 2: Abstractive Summarizer with Hugging Face
1.  Find a pre-trained summarization model on the Hugging Face Hub (e.g., `sshleifer/distilbart-cnn-12-6`).
2.  Use the `summarization` pipeline to generate a summary.

**This project allows you to choose your difficulty and apply the techniques you've learned. Good luck!** 