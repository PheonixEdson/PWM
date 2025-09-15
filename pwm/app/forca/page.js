// app/forca/page.js
"use client";
import { useState, useMemo } from "react";
import styles from "./forca.module.css";

const WORDS = [
  "REACT","JAVASCRIPT","NEXTJS","COMPONENTE","ESTADO","PROPS","ASYNC","PROMISE",
  "FUNCTION","ALGORITMO","ALFABETO","PROGRAMACAO","FRONTEND","BACKEND","NODEJS",
  "WEBPACK","BROWSER","SERVIDOR","CSS","HTML","DOM","HOOKS","REDUX","TIPAGEM",
  "FORCA","PALAVRA","DESAFIO","ARVORE","SENHA","CRIPTOGRAFIA","BANCO"
];

function pickRandom() {
  const i = Math.floor(Math.random() * WORDS.length);
  return WORDS[i];
}

function HangmanSVG({ mistakes }) {
  return (
    <svg viewBox="0 0 120 140" className={styles.svg}>
      {/* Base */}
      <line x1="10" y1="130" x2="110" y2="130" stroke="#222" strokeWidth="3"/>
      {/* Poste */}
      <line x1="30" y1="130" x2="30" y2="10" stroke="#222" strokeWidth="3"/>
      <line x1="30" y1="10" x2="80" y2="10" stroke="#222" strokeWidth="3"/>
      <line x1="80" y1="10" x2="80" y2="25" stroke="#222" strokeWidth="3"/>

      {/* Boneco */}
      {mistakes > 0 && <circle cx="80" cy="36" r="10" stroke="#111" strokeWidth="2" fill="none" />}
      {mistakes > 1 && <line x1="80" y1="46" x2="80" y2="80" stroke="#111" strokeWidth="2" />}
      {mistakes > 2 && <line x1="80" y1="56" x2="65" y2="70" stroke="#111" strokeWidth="2" />}
      {mistakes > 3 && <line x1="80" y1="56" x2="95" y2="70" stroke="#111" strokeWidth="2" />}
      {mistakes > 4 && <line x1="80" y1="80" x2="68" y2="105" stroke="#111" strokeWidth="2" />}
      {mistakes > 5 && <line x1="80" y1="80" x2="92" y2="105" stroke="#111" strokeWidth="2" />}
    </svg>
  );
}

export default function ForcaPage() {
  const [word, setWord] = useState(() => pickRandom());
  const [guessed, setGuessed] = useState(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [input, setInput] = useState("");
  const maxWrong = 6;

  const revealed = useMemo(() => {
    return word.split("").map(ch => (guessed.has(ch) ? ch : "_"));
  }, [word, guessed]);

  function handleGuess(letter) {
    letter = letter.toUpperCase();
    if (guessed.has(letter) || letter.length !== 1 || !/^[A-Z]$/.test(letter)) return;

    const newSet = new Set(guessed);
    newSet.add(letter);
    setGuessed(newSet);

    if (!word.includes(letter)) {
      setMistakes(prev => Math.min(maxWrong, prev + 1));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!input) return;
    handleGuess(input[0]);
    setInput("");
  }

  function restart() {
    setWord(pickRandom());
    setGuessed(new Set());
    setMistakes(0);
    setInput("");
  }

  const isWinner = !revealed.includes("_");
  const isLoser = mistakes >= maxWrong;
  const triedLetters = Array.from(guessed).sort();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>🎮 Jogo da Forca</h1>
      <p className={styles.subtitle}>Adivinhe a palavra — tema: Programação / Tecnologia</p>

      {/* Desenho */}
      <div className={styles.hangman}>
        <HangmanSVG mistakes={mistakes} />
      </div>

      {/* Palavra */}
      <div className={styles.wordDisplay}>
        {revealed.map((c, i) => (
          <span key={i} className={styles.letter}>{c}</span>
        ))}
      </div>

      {/* Informações */}
      <div className={styles.infoRow}>
        <span>Erros: {mistakes} / {maxWrong}</span>
        <span>Palavra com {word.length} letras</span>
      </div>

      {/* Teclado */}
      <div className={styles.keyboard}>
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(L => {
          const disabled = guessed.has(L) || isWinner || isLoser;
          const correct = guessed.has(L) && word.includes(L);
          const wrong = guessed.has(L) && !word.includes(L);
          return (
            <button
              key={L}
              onClick={() => handleGuess(L)}
              disabled={disabled}
              className={`${styles.key} ${correct ? styles.correct : ""} ${wrong ? styles.wrong : ""}`}
            >
              {L}
            </button>
          );
        })}
      </div>

      {/* Input manual */}
      <form onSubmit={handleSubmit} className={styles.inputRow}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value.replace(/[^a-zA-Z]/g, ""))}
          maxLength={1}
          placeholder="Digite uma letra"
          className={styles.input}
          disabled={isWinner || isLoser}
        />
        <button type="submit" className={styles.btn} disabled={isWinner || isLoser}>
          Enviar
        </button>
        <button type="button" className={styles.btnAlt} onClick={restart}>
          Reiniciar
        </button>
      </form>

      {/* Tentativas */}
      <div className={styles.tried}>
        <strong>Letras tentadas:</strong>
        <div className={styles.triedList}>
          {triedLetters.length === 0 ? <span>—</span> : triedLetters.map(L => (
            <span key={L} className={word.includes(L) ? styles.triedCorrect : styles.triedWrong}>{L}</span>
          ))}
        </div>
      </div>

      {/* Resultado */}
      <div className={styles.result}>
        {isWinner && <div className={styles.win}>🎉 Parabéns! Você acertou: <strong>{word}</strong></div>}
        {isLoser && <div className={styles.lose}>☠️ Você perdeu. A palavra era: <strong>{word}</strong></div>}
      </div>
    </main>
  );
}
