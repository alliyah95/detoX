import React from "react";
import { Nav, Hero, About, HowToUse, Footer } from "./components";
import { createRoot } from "react-dom/client";
import "./options.css";

const App: React.FC<{}> = () => {
    return (
        <>
            <Nav />
            <main>
                <Hero />
                <About />
                <HowToUse />
            </main>
            <Footer />
        </>
    );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
