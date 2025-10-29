import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './SearchBar_antd.module.css';

const { Search } = Input;

export default function SearchBar({ onSearch }) {
  return (
    <div className="d-flex justify-content-center align-items-center mb-3">
      <Search
        placeholder="Search by title..."
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearch}
        className="w-100 mx-auto"

      />
    </div>
  );
}