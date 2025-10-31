import {Table, Tag, Button, Popconfirm} from 'antd';
import {CheckOutlined, UndoOutlined, DeleteOutlined} from '@ant-design/icons';
import styles from './TodoTable_antd.module.css';

export default function TodoTable({todos, page, limit, total, onToggle, onDelete, onPageChange, loading}) {
    const columns = [
        {
            title: <strong>#</strong> ,
            key: 'index',
            width: '5%',
            align: 'center',
            render: (_, __, index) => (page - 1) * limit + index + 1,
        },
        {
            title: <strong>Title</strong>,
            dataIndex: 'title',
            key: 'title',
            width: '30%',

            sorter: (a, b) => a.title.localeCompare(b.title), // ✅ A–Z sorting
            sortDirections: ['ascend', 'descend'],
            render: (text, record) => (
                <span className={record.is_completed ? styles.completed : styles.normal}>
          {text}
        </span>
            ),
        },
        {
            title: <strong>Description</strong>,
            dataIndex: 'description',
            key: 'description',
            width: '30%',
            sorter: (a, b) => a.description.length - b.description.length,
            render: (text, record) => (
                <span className={record.is_completed ? styles.completed : styles.normal}>
          {text}
        </span>
            ),
        },
        {
            title: <strong>Status</strong>,
            key: 'status',
            align: 'center',
            width: '10%',
            render: (_, record) => (
                <Tag color={record.is_completed ? 'success' : 'warning'}>
                    {record.is_completed ? 'Completed' : 'Pending'}
                </Tag>
            ),
        },
        {
            title: <strong>Actions</strong>,
            key: 'actions',
            align: 'center',
            width: '25%',
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
                className={styles.customTable}
                columns={columns}
                dataSource={todos}
                loading={loading}
                rowKey="id"
                locale={{emptyText: 'No results found'}}
                scroll={{ y: 400 }}   // 👈 quan trọng
                tableLayout="fixed"
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
