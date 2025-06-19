## Under construction 
# LeetCode AI Assistant

A powerful Chrome extension that enhances your LeetCode experience with AI-powered assistance. Get instant problem explanations, code solutions, and debugging help right on the LeetCode platform.

## Features

### 🧠 **Three Core Functionalities**

1. **📖 Problem Explanation**
   - Detailed breakdown of problem requirements
   - Key concepts and algorithms explanation
   - Different solution approaches
   - Time/space complexity analysis
   - Edge cases identification

2. **💻 Code Solution & Explanation**
   - Complete working solutions in multiple languages
   - Step-by-step algorithm walkthrough
   - Code explanation with comments
   - Complexity analysis
   - Alternative approaches comparison

3. **🐛 Debug & Error Fixing**
   - Automatic error detection in your code
   - Fixed code with detailed explanations
   - Root cause analysis
   - Testing strategies
   - Best practice recommendations

### 🎯 **Smart Features**

- **Live Code Tracking**: Automatically detects your current code
- **Problem Detection**: Automatically identifies the current LeetCode problem
- **Real-time Updates**: Syncs with your coding progress
- **Secure API Management**: Safe storage of your Gemini API key
- **Clean UI**: Non-intrusive, modern interface

## 🚀 Installation

### Prerequisites
- Google Chrome browser
- [Gemini API Key](https://aistudio.google.com/app/apikey) (free)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ritikchauhan1704/chromeExtension
   cd chromeExtension
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Build the extension**
   ```bash
   npm run build
   # or
   bun run build
   ```

4. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (top right toggle)
   - Click "Load unpacked"
   - Select the `dist` folder from your project

5. **Configure API Key**
   - Click on the extension icon in Chrome toolbar
   - Enter your Gemini API key
   - Click "Save API Key"

## 🔑 Getting Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Paste it in the extension settings

**Note**: The API key is stored securely in your browser's local storage and never shared.

## 📖 Usage

### Getting Started

1. **Navigate to any LeetCode problem**
2. **Look for the AI Assistant** in the bottom-right corner
3. **Choose your desired function**:

### Function Guide

#### 📖 Explain Problem
- Click when you need help understanding the problem
- Perfect for beginners or complex problems
- Provides comprehensive problem breakdown

#### 💻 Get Solution  
- Click when you want to see a complete solution
- Includes multiple approaches and explanations
- Compares with your current code attempt

#### 🐛 Debug Code
- Write your code first, then click this button
- Identifies errors and provides fixes
- Explains why errors occurred and how to avoid them


## 🛠️ Technical Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **AI Provider**: Google Gemini 2.0 Flash
- **Package Manager**: Bun (or npm)

