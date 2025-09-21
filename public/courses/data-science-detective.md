---
id: 4
title: "Data Science Detective"
description: "Solve real-world mysteries using data analysis, visualization, and machine learning techniques."
level: "Beginner"
duration: "3 weeks"
projects: 5
students: 1100
rating: 4.9
category: "Data Science"
image: "/placeholder.svg?height=200&width=300"
tags: ["Pandas", "Visualization", "Statistics"]
featured: false
date: "2024-07-10"
---

## Course Overview

Put on your detective hat and get ready to solve mysteries with data! In this course, you'll learn how to use data to uncover hidden patterns, make predictions, and tell compelling stories.

### What You'll Investigate

-   The case of the missing sales data.
-   The mystery of customer churn.
-   The secret to predicting stock prices.
-   A final project where you solve a data mystery of your own.
---

## Week 1: The Case of the Missing Sales Data

Welcome, detective! Your first case involves a dataset with missing and messy data. A company's sales records are incomplete, and it's your job to clean them up and find initial insights.

### Your Detective Toolkit
-   **Pandas:** For data manipulation and analysis.
-   **Matplotlib & Seaborn:** For data visualization.
-   **NumPy:** For numerical operations.

Install them:
`pip install pandas matplotlib seaborn numpy`

### Case File 1: The Messy Sales Sheet
You are given a CSV file (`sales_data.csv`) with some problems:
-   Missing values (NaNs)
-   Incorrect data types
-   Outliers

**Your Mission:**
1.  Load the data into a Pandas DataFrame.
2.  Investigate the data using `.info()`, `.describe()`, and `.isnull().sum()`.
3.  Handle missing values. You can either fill them (e.g., with the mean or median) or drop the rows/columns. Justify your choice.
4.  Correct data types (e.g., a 'Date' column might be loaded as an object/string).
5.  Find and visualize any outliers using box plots.
6.  Produce a clean, final dataset and a short report on your findings.

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Create a dummy messy CSV for demonstration
data = {
    'Date': ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', None],
    'Product': ['A', 'B', 'A', 'C', 'B'],
    'Sales': [100, 150, np.nan, 200, 5000], # 5000 is an outlier
    'Quantity': [10, 15, 8, 20, 50]
}
df = pd.DataFrame(data)
df.to_csv('sales_data.csv', index=False)


# --- Your investigation starts here ---

# 1. Load the data
sales_df = pd.read_csv('sales_data.csv')
print("--- Initial Info ---")
sales_df.info()

# 2. Initial Investigation
print("\n--- Missing Values ---")
print(sales_df.isnull().sum())

# 3. Handle missing 'Sales' value (let's fill with the median)
median_sales = sales_df['Sales'].median()
sales_df['Sales'].fillna(median_sales, inplace=True)

# Handle missing 'Date' (let's drop the row as date is crucial)
sales_df.dropna(subset=['Date'], inplace=True)

# 4. Correct 'Date' data type
sales_df['Date'] = pd.to_datetime(sales_df['Date'])

print("\n--- Cleaned Info ---")
sales_df.info()
print(sales_df)

# 5. Visualize outliers in 'Sales'
plt.figure(figsize=(8, 6))
sns.boxplot(x=sales_df['Sales'])
plt.title('Box Plot of Sales')
plt.show()

# Critical Thinking Question: The value 5000 looks like an outlier. Is it a data entry error or a valid, extraordinary sale? How would you decide, and how would your decision affect your analysis?
```

---

## Week 2: The Mystery of Customer Churn

A subscription-based company is losing customers, but they don't know why. Your mission is to analyze their customer data to identify the key factors that predict customer churn.

### Case File 2: The Customer Database
You have a dataset (`churn_data.csv`) with customer demographics, usage patterns, and whether they churned (left the service).

**Your Mission:**
1.  **Exploratory Data Analysis (EDA):**
    -   Load the data.
    -   Use visualizations (histograms, bar charts, count plots) to understand the characteristics of customers who churn vs. those who don't.
    -   Look at variables like `Contract`, `Tenure`, `MonthlyCharges`, `PaymentMethod`.
2.  **Feature Engineering:**
    -   Convert categorical variables (like `Gender`, `Contract`) into numerical format using one-hot encoding (`pd.get_dummies`).
3.  **Build a Predictive Model:**
    -   Use a classification model like **Logistic Regression** to predict churn.
    -   Split your data into training and testing sets.
    -   Train the model and evaluate its accuracy.
4.  **Interpret the Results:**
    -   Look at the coefficients of the logistic regression model. Which factors are the strongest predictors of churn?
    -   Write a report for the company with actionable insights.

```python
# This is a conceptual outline. You would use a real churn dataset.
# We'll use the famous Telco Customer Churn dataset from Kaggle.
# Assume you have downloaded it as 'WA_Fn-UseC_-Telco-Customer-Churn.csv'

import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Load data
# df = pd.read_csv('WA_Fn-UseC_-Telco-Customer-Churn.csv')

# --- For demonstration, let's create a tiny dummy dataframe ---
churn_data = {
    'tenure': [1, 60, 2, 5, 70],
    'MonthlyCharges': [30, 100, 50, 80, 20],
    'Contract': ['Month-to-month', 'Two year', 'Month-to-month', 'One year', 'Two year'],
    'Churn': ['Yes', 'No', 'Yes', 'No', 'No']
}
df = pd.DataFrame(churn_data)
# --- End of dummy data ---


# 1. EDA: Visualize the effect of 'Contract' on 'Churn'
sns.countplot(x='Contract', hue='Churn', data=df)
plt.title('Churn by Contract Type')
plt.show()

# 2. Feature Engineering
df_dummies = pd.get_dummies(df, drop_first=True)

# 3. Build a Predictive Model
X = df_dummies.drop('Churn_Yes', axis=1)
y = df_dummies['Churn_Yes']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

model = LogisticRegression()
model.fit(X_train, y_train)

# 4. Evaluate
predictions = model.predict(X_test)
print(f"Model Accuracy: {accuracy_score(y_test, predictions):.2f}")

# Critical Thinking Question: Our model's accuracy might be high, but what if only 5% of customers churn? The model could predict "No Churn" for everyone and be 95% accurate. Why is accuracy a misleading metric here? What other metrics could you use? (e.g., Precision, Recall, F1-score).
```

---

## Week 3: Capstone: The Secret to Stock Prices

For your final case, you're moving from detective to fortune teller. Your mission is to analyze historical stock data and build a simple model to see if you can find patterns.

**DISCLAIMER:** This is for educational purposes ONLY. Do not use this for financial decisions. Real stock market prediction is incredibly complex.

### Case File 3: Historical Stock Data
You'll use a library like `yfinance` to download historical data for a stock of your choice (e.g., AAPL, GOOGL, TSLA).

`pip install yfinance`

**Your Mission:**
1.  **Data Acquisition:** Download several years of historical stock data.
2.  **Time Series Analysis:**
    -   Plot the closing price over time.
    -   Calculate and plot moving averages (e.g., 50-day and 200-day). This can help identify trends.
3.  **Correlation Analysis:**
    -   Is there a correlation between the trading volume and the daily price change? Create a scatter plot to investigate.
4.  **Simple Prediction (Optional Advanced):**
    -   Create a "target" variable: will the price go up or down tomorrow?
    -   Use features from today (e.g., today's price, moving averages) to predict the target.
    -   Build a simple classification model. **Be warned, this is very hard to do accurately!**
5.  **Write a Final Report:** Summarize your analysis. What trends did you find? Did the moving averages signal anything interesting (e.g., a "golden cross" where the 50-day moves above the 200-day)?

```python
import yfinance as yf
import matplotlib.pyplot as plt

# 1. Download data for Apple (AAPL)
ticker = "AAPL"
data = yf.download(ticker, start="2020-01-01", end="2023-01-01")

# 2. Calculate Moving Averages
data['MA50'] = data['Close'].rolling(window=50).mean()
data['MA200'] = data['Close'].rolling(window=200).mean()

# Plot the data
plt.figure(figsize=(14, 7))
plt.plot(data['Close'], label='AAPL Close')
plt.plot(data['MA50'], label='50-Day Moving Average')
plt.plot(data['MA200'], label='200-Day Moving Average')
plt.title('AAPL Stock Price with Moving Averages')
plt.legend()
plt.show()

# 3. Correlation Analysis
data['Daily_Change'] = data['Close'].pct_change()
plt.figure(figsize=(10, 6))
plt.scatter(data['Volume'], data['Daily_Change'])
plt.title('Volume vs. Daily Percentage Change')
plt.xlabel('Volume')
plt.ylabel('Daily Change')
plt.show()

# Critical Thinking Question: Looking at the moving averages, a "golden cross" is often seen as a bullish signal. A "death cross" (50-day below 200-day) is bearish. Can you spot any of these in your plot? Did the stock price behave as expected after these events? This shows how data science is used to test financial theories.
``` 