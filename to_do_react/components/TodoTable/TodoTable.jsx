import styles from "./TodoTable.module.css";

export default function TodoTable({todos, page, limit, onToggle, onDelete}) {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead className={styles.header}>
                <tr>
                    <th className={styles.th}>#</th>
                    <th className={styles.th}>Title</th>
                    <th className={styles.th}>Description</th>
                    <th className={styles.th}>Status</th>
                    <th className={styles.th}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {todos.length === 0 ? (
                    <tr>
                        <td colSpan="5" className={styles.empty}>No Results Found</td>
                    </tr>
                ) : (
                    todos.map((todo, index) => (
                        <tr key={todo.id} className={styles.tr}>
                            <td className={styles.td}>{(page - 1) * limit + index + 1}</td>
                            <td className={`${styles.td} ${todo.is_completed ? styles.completed : ""}`}>
                                {todo.title}
                            </td>
                            <td className={styles.td}>{todo.description}</td>
                            <td className={styles.td}>
                                {todo.is_completed ? (
                                    <span className={`${styles.status} ${styles.done}`}>✅ Completed</span>
                                ) : (
                                    <span className={`${styles.status} ${styles.pending}`}>⏳ Pending</span>
                                )}
                            </td>
                            <td className={styles.td}>
                                <button
                                    onClick={() => onToggle(todo)}
                                    className={`${styles.smBtn} ${todo.is_completed ? styles.undo : styles.doneBtn}`}
                                >
                                    {todo.is_completed ? "Undo" : "Done"}
                                </button>
                                <button
                                    onClick={() => onDelete(todo.id)}
                                    className={`${styles.smBtn} ${styles.delete}`}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}
