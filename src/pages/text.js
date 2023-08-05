import React from "react";

const Test = () => {
  const primaryColor = "#F1D4D4";
  const secondaryColor = "#DDB6C6";
  const accentColor = "#AC8DAF";
  const backgroundColor = "#484C7F";

  return (
    <div>
      {/* Header and Navigation */}
      <header style={{ backgroundColor: primaryColor }}>
        {/* Your logo or branding */}
        <nav>
          <a href="#" style={{ color: accentColor }}>
            Home
          </a>
          <a href="#" style={{ color: accentColor }}>
            About
          </a>
          <a href="#" style={{ color: accentColor }}>
            Quiz
          </a>
          {/* Add more navigation links */}
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{ backgroundColor: primaryColor, color: "#FFFFFF" }}>
        <h1>Welcome to the Quiz App</h1>
        <p>Test your knowledge with our exciting quizzes!</p>
        <button style={{ backgroundColor: accentColor, color: "#FFFFFF" }}>
          Get Started
        </button>
      </section>

      {/* Content Section 1 */}
      <section style={{ backgroundColor: backgroundColor, color: "#FFFFFF" }}>
        <h2 style={{ color: primaryColor }}>Quiz Categories</h2>
        <p>Choose from a variety of quiz categories...</p>
        <button style={{ backgroundColor: accentColor, color: "#FFFFFF" }}>
          Explore
        </button>
      </section>

      {/* Content Section 2 */}
      <section style={{ backgroundColor: backgroundColor, color: "#FFFFFF" }}>
        {/* Add more content */}
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: backgroundColor, color: "#FFFFFF" }}>
        <p>&copy; 2023 Your Quiz App. All rights reserved.</p>
        {/* Add more footer content */}
      </footer>
    </div>
  );
};
export default Test;
