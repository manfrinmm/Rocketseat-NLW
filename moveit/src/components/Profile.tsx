import styles from "../styles/components/Profile.module.css";

export default function Profile() {
  return (
    <div className={styles.container}>
      <img
        src="https://avatars.githubusercontent.com/u/47335205?v=4"
        alt="Matheus mm"
      />
      <div>
        <strong>Matheus mm</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level 1
        </p>
      </div>
    </div>
  );
}
