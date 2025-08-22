import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.profile}>
        {/* Foto */}
        <Image
          src="https://media.licdn.com/dms/image/v2/D4D03AQEujvr8jfNNEA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1698277975626?e=1758758400&v=beta&t=3uB9XBEOOTMnsB0ep2QePC_6RXVCMUzX4blhLOSVE5U"
          alt="Foto de perfil de Antônio Edson Alves de Holanda Neto"
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
          No tempo livre gosto de jogar e ir à academia.
        </p>
      </div>
    </main>
  );
}
