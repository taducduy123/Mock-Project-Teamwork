import styles from "./FilterBar.module.css";

export default function FilterBar({ value, onChange }) {
    const filters = ["all", "completed", "pending"];
    return (
        <div className={styles.container}>
            {filters.map((f) => (
                <button
                    key={f}
                    onClick={() => onChange(f)}
                    className={`${styles.btn} ${value === f ? styles.active : ""}`}
                >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
            ))}
        </div>
    );
}
