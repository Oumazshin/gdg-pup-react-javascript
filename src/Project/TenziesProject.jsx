import React, { useState } from "react";
import "./TenziesProject.css";
import Die from "./Die";

export default function TenziesProject() {
    const [dice, setDice] = useState(generateAllNewDice);

    const gameWon = dice.every(die => die.isClicked && die.value === dice[0].value);

    function generateAllNewDice() {
        return Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            value: Math.ceil(Math.random() * 6),
            isClicked: false
        }));
    }

    function rollDice() {
        setDice(prevDice => 
            gameWon ? generateAllNewDice() :
            prevDice.map(die => die.isClicked ? die : { ...die, value: Math.ceil(Math.random() * 6) })
        );
    }

    function hold(id) {
        setDice(prevDice => 
            prevDice.map(die => (die.id === id ? { ...die, isClicked: !die.isClicked } : die))
        );
    }

    return (
        <div className="project-container">
            <main>
                <h1 className="title">{gameWon ? "Congrats, You Won!" : "Tenzies"}</h1>
                <p className="instructions">
                    Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
                </p>

                <div className="dice-container">
                    {dice.map(die => (
                        <Die 
                            key={die.id}
                            {...die} 
                            hold={hold}
                        />
                    ))}
                </div>

                <button className="roll-dice-btn" onClick={rollDice}>
                    {gameWon ? "New Game" : "Roll"}
                </button>
            </main>
        </div>
    );
}
