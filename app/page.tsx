import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link"

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1>teste principal</h1>
        <Link href={'Estoque'}>Estoque</Link>
      </div>

    </main>
  );
}
