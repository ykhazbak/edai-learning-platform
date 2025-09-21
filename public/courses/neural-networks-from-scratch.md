---
id: 5
title: "Neural Networks from Scratch"
description: "Build neural networks line by line, understanding every component through hands-on coding."
level: "Advanced"
duration: "8 weeks"
projects: 10
students: 450
rating: 4.8
category: "Deep Learning"
image: "/placeholder.svg?height=200&width=300"
tags: ["Neural Networks", "PyTorch", "Mathematics"]
featured: false
date: "2024-07-09"
---

## Course Overview

This is not your typical deep learning course. You won't just learn how to use a library; you'll build your own. By the end of this course, you'll have a deep, fundamental understanding of how neural networks work.

### What You'll Create

-   A complete neural network library from scratch.
-   An image classifier for a popular dataset.
-   A recurrent neural network for sequence data.
-   A generative adversarial network (GAN) to create new images.
---

## A Note on this Course
This course is challenging and rewarding. We will build everything using only **NumPy**, a library for numerical operations. This forces a deep understanding of the mechanics. We will not use TensorFlow or PyTorch until the very end, to compare our library with the industry standards.

**Prerequisites:** Strong Python skills and a good understanding of high school level linear algebra (vectors, matrices) and calculus (derivatives).

---

## Week 1: The Neuron and The Layer

We start with the fundamental building block of all neural networks: the neuron.

### The Mathematical Neuron
A neuron takes several inputs, multiplies each by a weight, sums them up, adds a bias, and then passes the result through an **activation function**.
`output = activation( (input_1 * weight_1 + input_2 * weight_2 + ...) + bias )`

In vector form: `output = activation( np.dot(inputs, weights) + bias )`

### Project: Coding a Single Layer
Let's code a single layer of neurons.

```python
import numpy as np

# Set a seed for reproducibility
np.random.seed(0)

# Input data (batch of 3 samples, 4 features each)
X = np.array([[1.0, 2.0, 3.0, 2.5],
              [2.0, 5.0, -1.0, 2.0],
              [-1.5, 2.7, 3.3, -0.8]])

# A layer of 3 neurons
n_inputs = 4
n_neurons = 3

# Weights are initialized randomly, shape is (n_inputs, n_neurons)
weights = 0.10 * np.random.randn(n_inputs, n_neurons)
# Biases are initialized to zero
biases = np.zeros((1, n_neurons))

# Forward pass
layer_outputs = np.dot(X, weights) + biases

print("--- Layer Outputs ---")
print(layer_outputs)

# Critical Thinking: Why do we initialize weights randomly? What would happen if all weights were initialized to zero?
```

---

## Week 2: Activation Functions

The activation function introduces non-linearity, which allows neural networks to learn complex patterns. Without it, a neural network would just be a simple linear regression model.

### Common Activation Functions
-   **Step Function:** A simple on/off function. Not used in practice as it's not differentiable.
-   **Sigmoid:** S-shaped curve, squashes values between 0 and 1. `f(x) = 1 / (1 + exp(-x))`
-   **ReLU (Rectified Linear Unit):** `f(x) = max(0, x)`. The most common activation function. It's simple and efficient.

### Project: Implementing ReLU
Let's add a ReLU activation to our layer. We'll also start building our library as Python classes.

```python
import numpy as np
np.random.seed(0)

X = np.array([[1.0, 2.0, 3.0, 2.5],
              [2.0, 5.0, -1.0, 2.0],
              [-1.5, 2.7, 3.3, -0.8]])

class Layer_Dense:
    def __init__(self, n_inputs, n_neurons):
        self.weights = 0.10 * np.random.randn(n_inputs, n_neurons)
        self.biases = np.zeros((1, n_neurons))
    def forward(self, inputs):
        self.output = np.dot(inputs, self.weights) + self.biases

class Activation_ReLU:
    def forward(self, inputs):
        self.output = np.maximum(0, inputs)

# Create a dense layer with 4 inputs and 5 neurons
dense1 = Layer_Dense(4, 5)
# Create a ReLU activation
activation1 = Activation_ReLU()

# Perform a forward pass
dense1.forward(X)
activation1.forward(dense1.output)

print("--- Output after ReLU ---")
print(activation1.output)

# Critical Thinking: The ReLU function is not differentiable at x=0. Why is this not a major problem in practice?
```

---

## Week 3: Loss Functions

How do we know if our network is doing well or poorly? We need a **loss function** to measure its error.

### Categorical Cross-Entropy
A common loss function for classification problems. It measures how different the predicted probability distribution is from the actual distribution.
Lower cross-entropy means a better model.

### Project: Calculating Loss
First, we need a `Softmax` activation for the output layer, which turns the network's outputs into a probability distribution. Then we calculate the loss.

```python
import numpy as np

# ... (Layer_Dense class from before)

class Activation_Softmax:
    def forward(self, inputs):
        # Subtract max value for numerical stability
        exp_values = np.exp(inputs - np.max(inputs, axis=1, keepdims=True))
        probabilities = exp_values / np.sum(exp_values, axis=1, keepdims=True)
        self.output = probabilities

class Loss:
    def calculate(self, output, y):
        sample_losses = self.forward(output, y)
        data_loss = np.mean(sample_losses)
        return data_loss

class Loss_CategoricalCrossentropy(Loss):
    def forward(self, y_pred, y_true):
        # Clip data to prevent division by 0
        y_pred_clipped = np.clip(y_pred, 1e-7, 1 - 1e-7)
        
        # If labels are one-hot encoded
        if len(y_true.shape) == 2:
            correct_confidences = np.sum(y_pred_clipped * y_true, axis=1)
        # If labels are sparse
        elif len(y_true.shape) == 1:
            correct_confidences = y_pred_clipped[range(len(y_pred)), y_true]
            
        negative_log_likelihoods = -np.log(correct_confidences)
        return negative_log_likelihoods


# Example usage
softmax = Activation_Softmax()
softmax.forward([[1, 2, 3]]) # Example output from a final layer

# Example true labels
y_true = np.array([0, 1, 1]) # Sparse labels for 3 samples
y_pred = np.array([[0.7, 0.2, 0.1], [0.1, 0.5, 0.4], [0.02, 0.9, 0.08]]) # Example predictions

loss_function = Loss_CategoricalCrossentropy()
loss = loss_function.calculate(y_pred, y_true)

print(f"Loss: {loss}")

# Critical Thinking: What happens to the log loss if the model is very confident about the wrong answer (e.g., predicts 0.9 for class A when the answer is B)?
```

---

## Week 4: Backpropagation and Optimization

This is the core of how a neural network learns. We calculate the gradient of the loss with respect to each weight and bias, and then adjust them in the opposite direction of the gradient. This process is called **backpropagation**.

### The Chain Rule
Backpropagation is essentially a practical application of the chain rule from calculus to compute gradients throughout the network.

### Project: The Optimizer
We'll implement a simple **Stochastic Gradient Descent (SGD)** optimizer.

```python
# This is a conceptual implementation. 
# We are manually defining the gradients for this week.
# Next week we will calculate them automatically.

class Optimizer_SGD:
    def __init__(self, learning_rate=1.0):
        self.learning_rate = learning_rate
        
    def update_params(self, layer):
        # We assume dweights and dbiases are stored in the layer
        # during backpropagation
        layer.weights += -self.learning_rate * layer.dweights
        layer.biases += -self.learning_rate * layer.dbiases

# Conceptual usage:
# layer = Layer_Dense(...)
# optimizer = Optimizer_SGD()
# ...
# # after backpropagation calculates layer.dweights and layer.dbiases
# optimizer.update_params(layer)

# Critical Thinking: The `learning_rate` is a crucial hyperparameter. What happens if it's too large? What if it's too small?
```

---

## Weeks 5-6: Building a Full Network & Training on Real Data

We will now put all the pieces together: Layers, Activations, Loss, and Optimizer. We will implement the full backpropagation algorithm for each component and train our network on a real dataset (e.g., the spiral dataset from CS231n).

This is the most intensive part of the course. The code will be provided in a full script. The goal is to understand how the gradients flow backward through the network.

**Key steps in the training loop:**
1.  **Forward Pass:** Pass the data through the network to get predictions.
2.  **Calculate Loss:** Compare predictions to true labels.
3.  **Backward Pass (Backpropagation):**
    -   Start with the gradient of the loss function.
    -   Propagate the gradient backward through each layer, using the chain rule to calculate the gradient with respect to the layer's inputs, weights, and biases.
4.  **Update Parameters:** Use the optimizer to update the weights and biases using the calculated gradients.
5.  **Repeat:** Go back to step 1 for many epochs.

---

## Week 7: Recurrent Neural Networks (RNNs)

We'll extend our library to handle sequential data with a simple Recurrent Neural Network.

### What is an RNN?
An RNN has a "memory" of past inputs. The output from a neuron is fed back into it for the next timestep. This makes them suitable for tasks like language processing.

### Project: Building an RNN Cell from Scratch
We will implement the forward and backward pass for a single RNN cell.

---

## Week 8: Comparing our Library to PyTorch & Capstone

After building our library, we'll see how it compares to an industry-standard framework like PyTorch. We'll build the same network in both our library and PyTorch to appreciate the abstractions that frameworks provide.

### Capstone Project
Choose one:
1.  **Extend our library:** Implement a more advanced optimizer like Adam or add new layer types like Convolutional layers.
2.  **Build a GAN:** Use our library to create a simple Generative Adversarial Network to generate new data (e.g., new handwritten digits). This is a very challenging but rewarding project.
3.  **Train on a new dataset:** Adapt the code to solve a different classification problem of your choice. 