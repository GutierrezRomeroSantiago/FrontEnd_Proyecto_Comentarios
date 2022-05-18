import { FaFilm } from 'react-icons/fa';
import styles from "./Spinner.module.css"


export function Spinner() {
    return (
        <div className={styles.spinner}>
            <FaFilm className={styles.spinning} size={60}/>
        </div>
    )
}
