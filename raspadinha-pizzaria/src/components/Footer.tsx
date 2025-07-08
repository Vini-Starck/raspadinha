import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-800 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-[25px] select-none text-white">
        <p>
          Desenvolvido por{" "}
          <a
            href="https://starck-portifolio.web.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold no-underline hover:brightness-110 transition visited:text-white"
            style={{
              background: "linear-gradient(to right,rgb(250, 67, 21),rgba(223, 110, 17, 0.81),rgb(209, 174, 16))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            Vinícius Starck
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
