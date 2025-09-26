"use client";
import { useState, useMemo } from "react";
import styles from "./forca.module.css";

const WORDS = [
  "REACT","JAVASCRIPT","NEXTJS","COMPONENTE","PYTHON","CMD","OBJETO","CLASSE",
  "FUNCAO","ALGORITMO","ALFABETO","PROGRAMACAO","FRONTEND","BACKEND","NODEJS",
  "NAVEGADOR","SERVIDOR","CSS","HTML","DADOS","REDES","CRIPTOGRAFIA","JAVA"
];

export default function ForcaPage() {
  const [usedWords, setUsedWords] = useState([]);
  const [word, setWord] = useState(() => pickRandom([]));
  const [guessed, setGuessed] = useState(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [input, setInput] = useState("");
  const maxWrong = 6;

  function pickRandom(prevUsed) {
    const available = WORDS.filter(w => !prevUsed.includes(w));
    if (available.length === 0) {
      return WORDS[Math.floor(Math.random() * WORDS.length)];
    }
    const i = Math.floor(Math.random() * available.length);
    return available[i];
  }

  function HangmanSVG({ mistakes }) {
    const parts = [
      <circle key="head" cx="80" cy="36" r="10" stroke="#111" strokeWidth="2" fill="none" />,
      <line key="body" x1="80" y1="46" x2="80" y2="80" stroke="#111" strokeWidth="2" />,
      <line key="armL" x1="80" y1="56" x2="65" y2="70" stroke="#111" strokeWidth="2" />,
      <line key="armR" x1="80" y1="56" x2="95" y2="70" stroke="#111" strokeWidth="2" />,
      <line key="legL" x1="80" y1="80" x2="68" y2="105" stroke="#111" strokeWidth="2" />,
      <line key="legR" x1="80" y1="80" x2="92" y2="105" stroke="#111" strokeWidth="2" />,
    ];

    return (
      <svg viewBox="0 0 120 140" className={styles.svg}>
        {/* Base da forca */}
        <line x1="10" y1="130" x2="110" y2="130" stroke="#222" strokeWidth="3"/>
        <line x1="30" y1="130" x2="30" y2="10" stroke="#222" strokeWidth="3"/>
        <line x1="30" y1="10" x2="80" y2="10" stroke="#222" strokeWidth="3"/>
        <line x1="80" y1="10" x2="80" y2="25" stroke="#222" strokeWidth="3"/>
        {/* Boneco aparece aos poucos */}
        {parts.slice(0, mistakes)}
      </svg>
    );
  }

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
    handleGuess(input);
    setInput("");
  }

  function restart() {
    const newWord = pickRandom([...usedWords, word]);
    setWord(newWord);
    setUsedWords(prev => [...prev, word]);
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
              aria-label={`Letra ${L}`}
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
