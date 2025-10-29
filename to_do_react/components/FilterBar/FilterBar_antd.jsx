import React from "react";
import { Segmented } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./FilterBar.module.css";

export default function FilterBar_antd({ value, onChange, onAdd }) {
  return (
    <div className={styles.container}>
      <Segmented
        value={value}
        onChange={(val) => {
          if (val === "add") {
            onAdd(); // open TodoForm when "Add Todo" is clicked
          } else {
            onChange(val); // switch filters
          }
        }}
        options={[
          { label: "All", value: "all" },
          { label: "Completed", value: "completed" },
          { label: "Pending", value: "pending" },
          {
            label: (
              <span className="btn btn-success" >
                <PlusOutlined /> Add new task
              </span>
            ),
            value: "add",
          },
        ]}
        size="large"
      />
    </div>
  );
}
