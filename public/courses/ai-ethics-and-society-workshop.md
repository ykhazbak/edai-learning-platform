---
id: 6
title: "AI Ethics & Society Workshop"
description: "Explore the impact of AI on society while building responsible AI applications."
level: "All Levels"
duration: "2 weeks"
projects: 3
students: 800
rating: 4.6
category: "Ethics"
image: "/placeholder.svg?height=200&width=300"
tags: ["Ethics", "Bias", "Fairness"]
featured: false
date: "2024-07-08"
---

## Course Overview

With great power comes great responsibility. In this workshop, you'll explore the ethical challenges posed by AI and learn how to build AI systems that are fair, transparent, and accountable.

### What You'll Tackle

-   An audit of a real-world AI system for bias.
-   A framework for developing ethical AI.
-   A debate on the future of AI and work.
-   A final project on a topic in AI ethics that you're passionate about.
---

## A Note on this Workshop
This is a discussion-based workshop. While there are some technical components, the primary goal is to develop your critical thinking skills about the societal impact of AI. Be prepared to read, discuss, and write.

---

## Week 1: Bias, Fairness, and Transparency

This week, we explore how AI systems can inherit and even amplify human biases, and what we can do about it.

### Topic 1: What is Algorithmic Bias?
-   **Reading:** "Algorithmic Bias: A Reading List" by Rachel Thomas.
-   **Discussion Prompt:** What is the difference between an AI model being *accurate* and being *fair*? Can a model be one without the other? Discuss a real-world example of a biased AI system you've heard about in the news.

### Project 1: Auditing a Biased Model
We will use the **COMPAS dataset**, which was famously used to predict the likelihood of a criminal defendant re-offending. The dataset and an analysis by ProPublica showed that the model was biased against African Americans.

**Your Mission:**
1.  **Read the ProPublica article:** "Machine Bias" by Julia Angwin, Jeff Larson, Surya Mattu and Lauren Kirchner.
2.  **Explore the data:** You'll be given a simplified version of the COMPAS dataset.
3.  **Analyze for Bias:**
    -   Using Pandas, calculate the recidivism rate (rate of re-offending) for different racial groups in the dataset.
    -   The COMPAS model produces a "risk score." Compare the average risk scores for different racial groups.
    -   Compare the **false positive rate** for different groups. (i.e., when the model incorrectly predicts someone will re-offend, does it happen more often for one group?).
4.  **Write a Reflection:** Based on your analysis and the article, do you think this tool should be used by judges? What are the potential harms?

```python
# Conceptual code for the analysis part of the project
import pandas as pd

# Assume 'compas_df' is a pandas DataFrame loaded with the data.
# It has columns like 'race', 'sex', 'is_recid', 'decile_score' (the risk score)

# Example analysis:
print("Overall recidivism rate:")
print(compas_df['is_recid'].value_counts(normalize=True))

print("\nRecidivism rate by race:")
print(compas_df.groupby('race')['is_recid'].value_counts(normalize=True))

# Critical Thinking: The company that created the COMPAS tool argued their software was fair because the overall accuracy was similar across races. ProPublica argued it was unfair because the *types* of errors were different. Who do you think is right, and why? This gets at the heart of defining "fairness."
```

### Topic 2: Transparency and Explainable AI (XAI)
-   **Discussion:** If an AI model denies someone a loan, should the bank be required to explain why? What does a meaningful "explanation" look like?
-   **Introduction to XAI techniques:** Briefly cover concepts like LIME and SHAP, which are methods to help explain the predictions of complex models.

---

## Week 2: AI's Impact on Society & Your Final Project

This week, we broaden our scope to discuss the larger societal implications of AI and you will work on a final project.

### Topic 3: The Future of Work and AI
-   **Reading:** A selection of articles on AI's impact on jobs (e.g., from The Economist, MIT Technology Review).
-   **Debate Topic:** "This house believes that AI will create more jobs than it destroys."
    -   Students will be divided into two teams to prepare arguments for and against the motion.

### Topic 4: The Ethics of Autonomous Systems
-   **Case Study:** The Trolley Problem for self-driving cars.
    -   A self-driving car is about to crash. Should it swerve to save its passenger but hit a pedestrian? Or should it stay its course, protecting the pedestrian but harming its passenger?
-   **Discussion:** Who should make these decisions? The car's owner? The manufacturer? The government? Should there be a universal ethical code for autonomous vehicles?

### Final Project: An Ethical Case Study Analysis
For your final project, you will choose one of the following topics, conduct research, and write a 3-5 page report.

**Your Mission:**
1.  **Choose a Topic:**
    -   The use of facial recognition by law enforcement.
    -   The ethics of AI in hiring and recruitment.
    -   Deepfakes and their potential for misinformation.
    -   The environmental impact of training large AI models.
    -   A topic of your own choosing (approved by the instructor).
2.  **Research:** Find articles, studies, and news reports about your topic.
3.  **Analyze:** In your report, address the following:
    -   What is the technology and how does it work?
    -   Who are the stakeholders (the people and groups affected)?
    -   What are the potential benefits and harms?
    -   What are the key ethical issues at play (e.g., privacy, fairness, autonomy, safety)?
    -   Propose a set of guidelines or regulations that you think would help mitigate the harms while allowing for the benefits.

**This project is about developing a well-reasoned, evidence-based argument on a complex socio-technical issue.** 