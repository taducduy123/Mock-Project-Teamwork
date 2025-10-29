import {useEffect, useState, useCallback} from "react";
import {Button, message} from 'antd';
import "antd/dist/reset.css";
import styles from "./App.module.css";

import SearchBar from "./components/SearchBar/SearchBar_antd";
import FilterBar_antd from "./components/FilterBar/FilterBar_antd";
import TodoForm from "./components/TodoForm/TodoForm_antd";
import TodoTable from "./components/TodoTable/TodoTable_antd";
import Pagination from "./components/Pagination/Pagination_antd";

import {fetchTodos, createTodo, updateTodo, deleteTodo} from "./api";


export default function App() {
    console.log("app is called")
    console.log("a")


    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [total, setTotal] = useState(0);
    const [maxPage, setMaxPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form states
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({title: "", description: ""});

    // Load todos
    const load = async (opts = {}) => {
        setLoading(true);
        try {
            const curPage = opts.page ?? page;
            const curFilter = opts.filter ?? filter;
            const curSearch = opts.searchText ?? searchText;
            const skip = (curPage - 1) * limit;

            const data = await fetchTodos(curFilter, skip, limit, curSearch);
            setTodos(data.items);
            setTotal(data.total);
            setMaxPage(Math.max(1, Math.ceil(data.total / limit)));
        } catch {
            message.error('Failed to load todos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load().catch(console.error);
    }, [page, filter, searchText, limit]);

    const handleCreate = async (payload) => {
        const newItem = await createTodo(payload);
        setTodos((prev) => (prev.length < limit ? [newItem, ...prev] : [newItem, ...prev.slice(0, limit - 1)]));

        // setTitle("");
        // setDescription("");
        // setErrors({title: "", description: ""});
        setPage(1);
        setTotal((prev) => prev + 1);
        setFilter("all");
        // await load({page: 1});
        setShowForm(false);
    };

    const handleCancel = () => {
        setTitle("");
        setDescription("");
        setErrors({title: "", description: ""});
        setShowForm(false);
    };

    const handleToggle = async (todo) => {
        try {
            await updateTodo(todo.id, {...todo, is_completed: !todo.is_completed});
            await load();
            message.success(todo.is_completed ? 'Marked as pending' : 'Marked as completed');
        } catch {
            message.error('Failed to update todo');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this todo?")) return;
        try {
            await deleteTodo(id);
            const nextTotal = Math.max(0, total - 1);
            const nextMaxPage = Math.max(1, Math.ceil(nextTotal / limit));
            const nextPage = page > nextMaxPage ? nextMaxPage : page;

            setTotal(nextTotal);
            setMaxPage(nextMaxPage);
            setPage(nextPage);

            await load({page: nextPage});
            message.success("Todo deleted!");
        } catch {
            message.error("Failed to delete todo");
        }
    };

    const handleSearch = (value) => {
        setSearchText(value);
        setPage(1);
    };

    return (
        <div className={styles.todoContainer}>
            <div className={styles.contentWrapper}>
                <div className={styles.todoHeader}>📝 Todo List</div>

                <SearchBar onSearch={handleSearch}/>

                <FilterBar_antd
                    value={filter}
                    onChange={(f) => {
                        setFilter(f);
                        setPage(1);
                    }}
                    onAdd={() => setShowForm(true)} // 👈 opens TodoForm modal
                />
                {showForm && (
                    <TodoForm
                        onCreate={handleCreate}
                        onCancel={handleCancel}
                        visible={showForm}
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        errors={errors}
                        setErrors={setErrors}
                    />
                )}

                <TodoTable
                    todos={todos}
                    page={page}
                    limit={limit}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    loading={loading}
                />

                <Pagination
                    page={page}
                    maxPage={maxPage}
                    total={total}
                    onPrev={() => setPage((p) => Math.max(1, p - 1))}
                    onNext={() => setPage((p) => (p < maxPage ? p + 1 : p))}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
}
