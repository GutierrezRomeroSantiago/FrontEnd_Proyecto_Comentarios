import styles from "./empty.module.css";

export function Empty() {
    return (
        <div className={styles.empty}>
            No hay peliculas que coincidad con la búsqueda
        </div>
    )
}
