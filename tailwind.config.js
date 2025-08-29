/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // ถ้าใช้ Next.js
      "./components/**/*.{js,ts,jsx,tsx}", 
      "./app/**/*.{js,ts,jsx,tsx}",       // ถ้าใช้ App Router
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }