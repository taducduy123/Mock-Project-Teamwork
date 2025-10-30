import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./SearchBar_antd.module.css";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  // Debounce user typing by 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query.trim());
    }, 400); // wait 500ms after user stops typing
    return () => clearTimeout(handler);
  }, [query, onSearch]);

  return (
    <div className={styles.container}>
      <Input
        size="large"
        placeholder="Search by title..."
        prefix={<SearchOutlined />}
        allowClear
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
}
