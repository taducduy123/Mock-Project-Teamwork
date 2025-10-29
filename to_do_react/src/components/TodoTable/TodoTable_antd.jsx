import {Table, Tag, Button, Popconfirm} from 'antd';
import {CheckOutlined, UndoOutlined, DeleteOutlined} from '@ant-design/icons';
import styles from './TodoTable_antd.module.css';

export default function TodoTable({todos, page, limit, total, onToggle, onDelete, onPageChange, loading}) {
    const columns = [
        {
            title: '#',
            key: 'index',
            width: 60,
            render: (_, __, index) => (page - 1) * limit + index + 1,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title), // ✅ A–Z sorting
            sortDirections: ['ascend', 'descend'],
            render: (text, record) => (
                <span className={record.is_completed ? styles.completed : styles.normal}>
          {text}
        </span>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => a.description.localeCompare(b.description),
            render: (text, record) => (
                <span className={record.is_completed ? styles.completed : styles.normal}>
          {text}
        </span>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            width: 120,
            render: (_, record) => (
                <Tag color={record.is_completed ? 'success' : 'warning'}>
                    {record.is_completed ? 'Completed' : 'Pending'}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 180,
            render: (_, record) => (
                <div className={styles.actions}>
                    <Button
                        type={record.is_completed ? 'default' : 'primary'}
                        size="small"
                        icon={record.is_completed ? <UndoOutlined/> : <CheckOutlined/>}
                        onClick={() => onToggle(record)}
                    >
                        {record.is_completed ? 'Undo' : 'Done'}
                    </Button>


                    <Popconfirm
                        title={`Do you want to delete this task?`}
                        okText="Delete"
                        okButtonProps={{danger: true}}
                        onConfirm={() => onDelete?.(record.id)}
                    >
                        <Button
                        danger
                        size="small"
                        icon={<DeleteOutlined/>}
                    >
                        Delete
                    </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div className={styles.tableContainer}>
            <Table
                columns={columns}
                dataSource={todos}
                loading={loading}
                rowKey="id"
                locale={{emptyText: 'No todos found'}}
                pagination={
                    {
                        current: page,
                        pageSize: limit,
                        total: total,
                        showSizeChanger: false,    // khóa đổi pageSize
                        showTotal: (t, range) => `${range[0]}–${range[1]} / ${t} record(s)`,
                        onChange: (p) => onPageChange?.(p),
                    }

                }
            />
        </div>
    );
}
