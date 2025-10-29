import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './SearchBar_antd.module.css';

const { Search } = Input;

export default function SearchBar({ onSearch }) {
  return (
    <div className={styles.container}>
      <Search
        placeholder="Search by title..."
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearch}
        className={styles.searchInput}
      />
    </div>
  );
}