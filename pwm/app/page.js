import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.profile}>
        {/* Foto */}
        <Image
          src="/foto.jpg"
          alt="Foto de perfil de Antônio Edson Alves de Holanda Neto"
          width={200}
          height={200}
          className={styles.avatar}
        />

        {/* Nome */}
        <h1 className={styles.title}>Antônio Edson Alves de Holanda Neto</h1>

        {/* Mini bio */}
        <p className={styles.bio}>
          Sou estudante de Ciência da Computação na UNICAP. <br />
          Atualmente estou no sexto período. <br />
          No tempo livre gosto de jogar e ir à academia.
        </p>
      </div>

      {/* Seção Formação */}
      <section className={styles.section}>
        <h2>🎓 Formação</h2>
        <p>Ciência da Computação - UNICAP (6º período)</p>
      </section>

      {/* Seção Habilidades */}
      <section className={styles.section}>
        <h2>💻 Habilidades</h2>
        <ul>
          <li>React & Next.js</li>
          <li>JavaScript / Node.js</li>
          <li>HTML & CSS</li>
          <li>Git & GitHub</li>
          <li>Banco de Dados</li>
        </ul>
      </section>

      {/* Seção Projetos */}
      <section className={styles.section}>
        <h2>🚀 Projetos</h2>
        <ul>
          <li>Portfólio pessoal em Next.js</li>
          <li>Sistema de agendamento para clínica médica</li>
          <li>Projeto de detecção de phishing</li>
        </ul>
      </section>

      {/* Link para o jogo da Forca */}
      <section className={styles.section}>
        <h2>🎮 Demonstração</h2>
        <p>
          Veja minha implementação do{" "}
          <Link href="/forca" className={styles.link}>
            Jogo da Forca
          </Link>
        </p>
      </section>
    </main>
  );
}
