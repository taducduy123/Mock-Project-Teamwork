import React from "react";
import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./TodoForm_antd.module.css";

export default function TodoForm({
  onCreate,
  onCancel,
  title,
  setTitle,
  description,
  setDescription,
  errors,
  setErrors,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = { ...errors };
    let hasError = false;

    if (!title.trim()) {
      newErrors.title = "Please enter a title";
      hasError = true;
    } else {
      newErrors.title = "";
    }

    if (!description.trim()) {
      newErrors.description = "Please enter a description";
      hasError = true;
    } else {
      newErrors.description = "";
    }

    setErrors(newErrors);

    if (!hasError) {
      onCreate({ title, description });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <div className={styles.label}>Title</div>
        <Input
          placeholder="Enter title"
          size="large"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors({ ...errors, title: "" });
          }}
          status={errors.title ? "error" : ""}
        />
        {errors.title && <div className={styles.errorText}>{errors.title}</div>}
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.label}>Description</div>
        <Input
          placeholder="Enter description"
          size="large"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors({ ...errors, description: "" });
          }}
          status={errors.description ? "error" : ""}
        />
        {errors.description && <div className={styles.errorText}>{errors.description}</div>}
      </div>

      <div className={styles.buttonGroup}>
        <Button type="primary" icon={<PlusOutlined />} size="large" htmlType="submit">
          Add Todo
        </Button>
        <Button size="large" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
