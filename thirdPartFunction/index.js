export function ConstructQuote() {
  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The best way to predict the future is to create it. - Peter Drucker",
    "Do not watch the clock. Do what it does. Keep going. - Sam Levenson",
    "You miss 100% of the shots you don’t take. - Wayne Gretzky",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "Your time is limited, so don’t waste it living someone else’s life. - Steve Jobs",
    "The harder you work for something, the greater you’ll feel when you achieve it. - Unknown",
    "Don’t watch the clock; do what it does. Keep going. - Sam Levenson"
  ];

  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}