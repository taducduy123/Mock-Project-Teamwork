import { useState } from "react";
import styles from "./TodoForm.module.css"; // nhớ đổi tên file CSS cho khớp

export default function TodoForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const submit = async (e) => {
    e.preventDefault();

    const newErrors = { title: "", description: "" };
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";

    if (newErrors.title || newErrors.description) {
      setErrors(newErrors);
      return;
    }

    await onCreate({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={submit} className={styles["todo-form"]}>
      <div className={styles["input-group"]}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors({ ...errors, title: "" });
          }}
          className={`${styles.input} ${errors.title ? styles["input-error"] : ""}`}
        />
        {errors.title && (
          <span className={styles["error-text"]}>{errors.title}</span>
        )}
      </div>

      <div className={styles["input-group"]}>
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors({ ...errors, description: "" });
          }}
          className={`${styles.input} ${errors.description ? styles["input-error"] : ""}`}
        />
        {errors.description && (
          <span className={styles["error-text"]}>{errors.description}</span>
        )}
      </div>

      <button type="submit" className={styles["add-button"]}>
        ➕ Add
      </button>
    </form>
  );
}
