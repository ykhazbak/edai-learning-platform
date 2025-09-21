---
id: 2
title: "Computer Vision Workshop"
description: "Create image recognition apps, build photo filters, and train models to see the world like you do."
level: "Intermediate"
duration: "4 weeks"
projects: 6
students: 890
rating: 4.8
category: "Computer Vision"
image: "/images/courses/computer-vision-workshop.jpg"
tags: ["OpenCV", "Deep Learning", "Image Processing"]
featured: false
date: "2024-07-12"
---

## Course Overview

In this workshop, you'll dive into the fascinating world of computer vision. You'll learn how to build applications that can "see" and interpret the world, from simple image filters to complex object detection models.

### What You'll Build

-   An app that recognizes handwritten digits.
-   A real-time face detection system.
-   A tool for artistic style transfer.
-   A capstone project of your choice.
---

## Week 1: Image Processing Fundamentals

Before we can do complex recognition, we need to learn how to manipulate images at a basic level. This week is all about the building blocks of computer vision.

### Your Computer Vision Toolkit
We'll be using two key libraries:
-   **OpenCV:** The swiss-army knife for computer vision tasks.
-   **Matplotlib:** For displaying images and plots.

Install them via pip:
`pip install opencv-python matplotlib`

### Project 1: Building an Instagram-style Filter
Let's start by creating a function that applies a simple "sepia" filter to an image.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

def apply_sepia(image_path):
    # Read the image
    img = cv2.imread(image_path)
    # Convert from BGR (OpenCV default) to RGB for display
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Create the sepia filter matrix
    sepia_filter = np.array([[0.272, 0.534, 0.131],
                             [0.349, 0.686, 0.168],
                             [0.393, 0.769, 0.189]])
    
    # Apply the filter
    sepia_img = cv2.transform(img, sepia_filter)
    
    # Clip values to be in the 0-255 range
    sepia_img[np.where(sepia_img > 255)] = 255
    
    # Display the images
    plt.figure(figsize=(10, 5))
    plt.subplot(1, 2, 1)
    plt.title('Original')
    plt.imshow(img)
    plt.axis('off')
    
    plt.subplot(1, 2, 2)
    plt.title('Sepia')
    plt.imshow(sepia_img)
    plt.axis('off')
    
    plt.show()

# Find an image on your computer and pass its path here
apply_sepia('path/to/your/image.jpg')
```

**Hands-on Challenge:**
- Find an image and test the code.
- **Critical Thinking:** The sepia filter is just a matrix multiplication. Can you create your own filter? Try creating a grayscale filter or one that boosts the red channel. What does a matrix like `[[0, 0, 1], [0, 1, 0], [1, 0, 0]]` do? (Hint: It swaps color channels).

---

## Week 2: Object Detection with Haar Cascades

This week, we'll move from simple image manipulation to finding objects within an image. We'll use a classic and fast technique called Haar Cascades.

### What are Haar Cascades?
It's a machine learning-based approach where a cascade function is trained from a lot of positive and negative images. It is then used to detect objects in other images. It's particularly effective for detecting faces.

### Project 2: Real-time Face and Eye Detection
Let's build a program that uses your webcam to detect faces and eyes in real-time.

You'll need pre-trained Haar Cascade models. OpenCV comes with them. You'll need to find the path to `haarcascade_frontalface_default.xml` and `haarcascade_eye.xml` on your system or download them from OpenCV's GitHub repository.

```python
import cv2

# Load the cascades
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

# Start webcam
cap = cv2.VideoCapture(0)

while True:
    # Read a frame
    ret, frame = cap.read()
    if not ret:
        break
        
    # Convert to grayscale (cascades work on grayscale)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    # Detect faces
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    
    for (x, y, w, h) in faces:
        # Draw a rectangle around the face
        cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
        
        # Region of Interest (the face) in both color and gray
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = frame[y:y+h, x:x+w]
        
        # Detect eyes within the face ROI
        eyes = eye_cascade.detectMultiScale(roi_gray)
        for (ex, ey, ew, eh) in eyes:
            cv2.rectangle(roi_color, (ex, ey), (ex+ew, ey+eh), (0, 255, 0), 2)
            
    # Display the output
    cv2.imshow('Face Detection', frame)
    
    # Break loop on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the webcam and close windows
cap.release()
cv2.destroyAllWindows()
```

**Hands-on Challenge:**
- **Critical Thinking:** The `detectMultiScale` function has parameters `scaleFactor` (1.3) and `minNeighbors` (5). What do these do? Read the OpenCV documentation and experiment by changing them. How do they affect the detection?
- Can you find other pre-trained Haar cascades (e.g., for full-body detection) and adapt the code?

---

## Week 3: Deep Learning for Image Classification

Haar cascades are great but limited. For more complex tasks, we need deep learning. This week, we'll build our own Convolutional Neural Network (CNN).

### What is a CNN?
A CNN is a special type of neural network designed for processing pixel data. It uses "convolutional" layers to learn features from images, like edges, corners, and textures.

### Project 3: Rock, Paper, Scissors Classifier
Let's build and train a CNN to recognize images of hands playing Rock, Paper, or Scissors.

We'll use TensorFlow and a dataset you can download: [Rock, Paper, Scissors Dataset](https://www.kaggle.com/drgfreeman/rockpaperscissors).

```python
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense

# Setup data generators
# This will load images from directories and apply data augmentation
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=40,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest',
    validation_split=0.2 # 20% of data for validation
)

# Training data generator
train_generator = train_datagen.flow_from_directory(
    'path/to/rps-dataset/',
    target_size=(150, 150),
    batch_size=32,
    class_mode='categorical',
    subset='training'
)

# Validation data generator
validation_generator = train_datagen.flow_from_directory(
    'path/to/rps-dataset/',
    target_size=(150, 150),
    batch_size=32,
    class_mode='categorical',
    subset='validation'
)


# Build the CNN Model
model = Sequential([
    # 1st conv layer
    Conv2D(64, (3,3), activation='relu', input_shape=(150, 150, 3)),
    MaxPooling2D(2, 2),
    # 2nd conv layer
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D(2,2),
    # 3rd conv layer
    Conv2D(128, (3,3), activation='relu'),
    MaxPooling2D(2,2),
    # Flatten the results to feed into a DNN
    Flatten(),
    # Dense layer
    Dense(512, activation='relu'),
    # Output layer
    Dense(3, activation='softmax') # 3 classes: rock, paper, scissors
])

model.summary()

model.compile(loss='categorical_crossentropy', optimizer='rmsprop', metrics=['accuracy'])

# Train the model
history = model.fit(train_generator, epochs=10, validation_data=validation_generator)
```

**Hands-on Challenge:**
- **Critical Thinking:** Look at the `ImageDataGenerator`. We are applying "data augmentation" (rotating, shifting, zooming). Why is this crucial for training a robust computer vision model? What problems might we face if we trained only on perfectly centered, upright images?
- Look at the model architecture. Try adding or removing convolutional layers. How does this affect the training time and final accuracy?

---

## Week 4: Capstone: Object Tracking in Video

For your capstone, you will combine what you've learned to build a more complex application: tracking a colored object in a live video stream.

### Your Mission
Create a Python script that:
1.  Opens your webcam.
2.  Allows you to define a color to track (e.g., a bright green or blue object).
3.  Finds the object of that color in each frame.
4.  Draws a bounding box around the largest detected object.
5.  (Bonus) Draws the path the object has traveled.

### Key Concepts to Use
-   **Color Spaces:** You'll need to convert the video frames from BGR to the HSV (Hue, Saturation, Value) color space. HSV is much better for color-based filtering.
-   **Masking:** You'll create a "mask" that only shows pixels within your desired color range.
-   **Contours:** You'll use OpenCV's `findContours` function to find the continuous shapes in your mask.
-   **Bounding Box:** You'll find the largest contour and draw a rectangle around it.

A starting point for your code:
```python
#
# Your code will go here.
# You will need to:
# 1. Start a video capture loop.
# 2. Convert each frame to HSV.
# 3. Define a lower and upper bound for the color you want to track in HSV.
#    (e.g., lower_blue = np.array([110,50,50]), upper_blue = np.array([130,255,255]))
# 4. Create a mask using cv2.inRange().
# 5. Use cv2.findContours() on the mask.
# 6. If contours are found, find the largest one using max(contours, key=cv2.contourArea).
# 7. Get the bounding rectangle for the largest contour using cv2.boundingRect().
# 8. Draw the rectangle on the original frame.
# 9. Display the frame.
#
```

**This capstone project requires you to research OpenCV functions and apply concepts from the entire workshop. Good luck!** 