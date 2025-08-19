import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.profile}>
        {/* Foto */}
        <Image
          src="/me.png"
          alt="Minha foto"
          width={200}
          height={200}
          className={styles.avatar}
        />

        {/* Nome */}
        <h1 className={styles.title}>Antônio Edson Alves de Holanda Neto</h1>

        {/* Mini bio */}
        <p className={styles.bio}>
          Sou estudante de Ciência da Computação na UNICAP.  
          Atualmente estou no sexto período.  
          No tempo livre gosto de jogar e ir a academia.
        </p>
      </div>
    </main>
  );
}
