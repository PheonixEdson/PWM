// app/forca/page.js
"use client";
import { useState, useEffect, useMemo } from "react";
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
  // desenha progressivamente com base em mistakes (0..6)
  return (
    <svg viewBox="0 0 120 140" className={styles.svg}>
      {/* base */}
      <line x1="10" y1="130" x2="110" y2="130" stroke="#222" strokeWidth="3"/>
      {/* poste */}
      <line x1="30" y1="130" x2="30" y2="10" stroke="#222" strokeWidth="3"/>
      <line x1="30" y1="10" x2="80" y2="10" stroke="#222" strokeWidth="3"/>
      <line x1="80" y1="10" x2="80" y2="25" stroke="#222" strokeWidth="3"/>

      {/* 1: cabeça */}
      {mistakes > 0 && <circle cx="80" cy="36" r="10" stroke="#111" strokeWidth="2" fill="none" />}
      {/* 2: corpo */}
      {mistakes > 1 && <line x1="80" y1="46" x2="80" y2="80" stroke="#111" strokeWidth="2" />}
      {/* 3: braço esquerdo */}
      {mistakes > 2 && <line x1="80" y1="56" x2="65" y2="70" stroke="#111" strokeWidth="2" />}
      {/* 4: braço direito */}
      {mistakes > 3 && <line x1="80" y1="56" x2="95" y2="70" stroke="#111" strokeWidth="2" />}
      {/* 5: perna esquerda */}
      {mistakes > 4 && <line x1="80" y1="80" x2="68" y2="105" stroke="#111" strokeWidth="2" />}
      {/* 6: perna direita */}
      {mistakes > 5 && <line x1="80" y1="80" x2="92" y2="105" stroke="#111" strokeWidth="2" />}
    </svg>
  );
}

export default function ForcaPage() {
  const [word, setWord] = useState(() => pickRandom());
  const [guessed, setGuessed] = useState(new Set());
  const [mistakes, setMistakes] = useState(0);
  const maxWrong = 6;
  const [input, setInput] = useState("");

  useEffect(() => {
    // reset when new word set
  }, [word]);

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
    e?.preventDefault();
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
    <section className={styles.container}>
      <div className={styles.left}>
        <h1>Jogo da Forca</h1>
        <p className={styles.subtitle}>Adivinhe a palavra — tema: programação / tecnologia</p>

        <div className={styles.hangman}>
          <HangmanSVG mistakes={mistakes} />
        </div>

        <div className={styles.wordDisplay} aria-label="Palavra">
          {revealed.map((c, i) => (
            <span key={i} className={styles.letter}>{c}</span>
          ))}
        </div>

        <div className={styles.infoRow}>
          <div>Erros: {mistakes} / {maxWrong}</div>
          <div>Palavra tem {word.length} letras</div>
        </div>

        <div className={styles.keyboard}>
          { "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((L) => {
            const disabled = guessed.has(L) || isWinner || isLoser;
            const correct = guessed.has(L) && word.includes(L);
            const wrong = guessed.has(L) && !word.includes(L);
            return (
              <button
                key={L}
                className={`${styles.key} ${correct ? styles.correct : ""} ${wrong ? styles.wrong : ""}`}
                onClick={() => handleGuess(L)}
                disabled={disabled}
                aria-label={`Letra ${L}`}
              >
                {L}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className={styles.inputRow}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value.replace(/[^a-zA-Z]/g, ""))}
            maxLength={1}
            placeholder="Digite uma letra"
            className={styles.input}
            disabled={isWinner || isLoser}
          />
          <button type="submit" className={styles.btn} disabled={isWinner || isLoser}>Enviar</button>
          <button type="button" className={styles.btnAlt} onClick={restart}>Reiniciar</button>
        </form>

        <div className={styles.tried}>
          <strong>Tentativas:</strong>
          <div className={styles.triedList}>
            {triedLetters.length === 0 ? <span>—</span> : triedLetters.map(L => (
              <span key={L} className={word.includes(L) ? styles.triedCorrect : styles.triedWrong}>{L}</span>
            ))}
          </div>
        </div>

        <div className={styles.result}>
          {isWinner && <div className={styles.win}>🎉 Parabéns — você ganhou! A palavra era <strong>{word}</strong></div>}
          {isLoser && <div className={styles.lose}>☠️ Você perdeu. A palavra era <strong>{word}</strong></div>}
        </div>
      </div>

      <aside className={styles.right}>
        <h3>Como jogar</h3>
        <ol>
          <li>Tente adivinhar a palavra clicando nas letras ou digitando uma letra.</li>
          <li>Cada erro aumenta o desenho do boneco. Você tem {maxWrong} erros permitidos.</li>
          <li>Clique em <strong>Reiniciar</strong> para começar uma nova palavra aleatória.</li>
        </ol>

        <h3>Dicas</h3>
        <ul>
          <li>As palavras são relacionadas a tecnologia e programação.</li>
          <li>Use a lista de tentativas para não repetir letras.</li>
        </ul>
      </aside>
    </section>
  );
}
