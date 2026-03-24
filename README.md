# AI Website Generator

An AI-powered website generator that converts natural language prompts into fully functional, modern, and responsive websites.

Built with React and Gemini AI, this tool enables developers to generate complete, production-ready website code instantly using simple text descriptions.

---

## Live Demo

https://ai-website-generator-kappa-ten.vercel.app/

Try generating complete websites instantly.

---

## Features

- AI-powered website generation  
  Generate full websites from simple text prompts using Gemini AI.

- Complete code output  
  Returns a single, structured HTML file with all required code.

- Modern UI design  
  Produces responsive, visually appealing layouts with animations and best UI/UX practices.

- Framework support  
  - HTML + CSS  
  - HTML + Tailwind CSS  
  - HTML + Bootstrap  
  - HTML + CSS + JavaScript  

- Built-in code editor  
  Monaco Editor integration for real-time code viewing and editing.

- Live preview  
  Instantly preview generated websites inside the application.

- Copy and export functionality  
  Easily copy or export generated code.

- Fast and interactive UI  
  Smooth loading states and responsive user experience.

---

## Tech Stack

Frontend:
- React.js
- Tailwind CSS
- React Select
- Monaco Editor

AI Integration:
- Gemini API (`@google/genai`)

UI Enhancements:
- React Icons
- React Spinners

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/kpriya213/AI-Website-Generator.git
cd ai-website-generator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

### 4. Run the project
```bash
npm run dev
```

---

## Usage

1. Select your preferred framework  
2. Describe the website (e.g., "landing page for a SaaS product with pricing and testimonials")  
3. Click Generate  
4. View code in the editor or preview it live  

---

## Project Structure

```
src/
│── components/
│   └── NavBar.jsx
│
│── pages/
│   └── Home.jsx
│
│── App.jsx
│── main.jsx
```

---

## Key Highlights

- Built an AI-driven website generation tool that improves developer productivity  
- Integrated LLM-based code generation into a real-world application  
- Designed a clean, interactive UI with real-time feedback  
- Deployed using Vercel for fast and reliable hosting  
- Demonstrates strong skills in:
  - React development  
  - API integration  
  - UI/UX design  
  - State management  

---

## Security Note

Do not expose API keys in frontend code.  
Always use environment variables (`.env`) for sensitive data.

---

## Future Improvements

- Add support for React / Next.js website generation  
- Improve prompt-to-code accuracy  
- Add multi-page website generation  

---
