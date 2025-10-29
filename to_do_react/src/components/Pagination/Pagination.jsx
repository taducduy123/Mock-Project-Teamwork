import styles from "./Pagination.module.css";

export default function Pagination({ page, maxPage, onPrev, onNext }) {
    const safePage = maxPage === 0 ? 1 : page;
    const safeMax  = maxPage === 0 ? 1 : maxPage;

    return (
        <div className={styles.pagination}>
            <button onClick={onPrev} disabled={safePage === 1} className={styles.pageBtn}>
                ⬅ Prev
            </button>

            <span className={styles.pageInfo}>Page {safePage} / {safeMax}</span>

            <button onClick={onNext} disabled={safePage >= safeMax} className={styles.pageBtn}>
                Next ➡
            </button>
        </div>
    );
}
