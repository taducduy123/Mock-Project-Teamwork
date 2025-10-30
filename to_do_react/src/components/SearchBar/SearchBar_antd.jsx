import React, {useState, useEffect} from "react";
import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import styles from "./SearchBar_antd.module.css";

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");
    const [isActive, setIsActive] = useState(false);
    // true = cho phép search
    // false = ngừng search tự động

    useEffect(() => {
        const handler = setTimeout(() => {
            if (!isActive) {
                // nếu đã rời chuột khỏi ô search thì không search nữa
                return;
            }

            const cleaned = query.trim();
            onSearch(cleaned);
        }, 200); // search sau 200ms

        return () => clearTimeout(handler);
    }, [query, isActive, onSearch]);

    return (
        <div className={styles.outer}>
            <div
                className={styles.searchShell}
                onMouseEnter={() => setIsActive(true)}
                onMouseLeave={() => setIsActive(false)}
            >
                <Input
                    classNames={styles.searchInput}
                    size="large"
                    placeholder="Search by title & description ..."
                    prefix={<SearchOutlined />}
                    allowClear
                    bordered={false}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
        </div>
    );
}
