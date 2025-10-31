import {useEffect, useState} from "react";
import {message, Modal} from 'antd';
import "antd/dist/reset.css";
import SearchBar from "./components/SearchBar/SearchBar_antd";
import TodoForm from "./components/TodoForm/TodoForm_antd";
import TodoTable from "./components/TodoTable/TodoTable_antd";
import {fetchTodos, createTodo, updateTodo, deleteTodo} from "./api";
import FilterBar from "./components/FilterBar/FilterBar";
import "./App.css";

export function App() {
    console.log("app is called")

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
    }, [page, filter, searchText]);


    const handleCreate = async (payload) => {
        const newItem = await createTodo(payload);
        setTodos((prev) => (prev.length < limit ? [newItem, ...prev] : [newItem, ...prev.slice(0, limit - 1)]));

        setPage(1);
        setMaxPage(Math.max(1, Math.ceil(total + 1 / limit)));
        setTotal((prev) => prev + 1);
        setFilter("all");

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
            await updateTodo(todo.id, {is_completed: !todo.is_completed});

            let nextTodos = todos.map(x => x);
            for (let i = 0; i < nextTodos.length; i++) {
                if (nextTodos[i].id === todo.id) {
                    nextTodos[i].is_completed = !todo.is_completed;
                }
            }
            setTodos(nextTodos);

            if ((filter === "completed" && !todo.is_completed) || (filter === "pending" && todo.is_completed)) {
                console.log("call")
                await load();
            }


            message.success(todo.is_completed ? 'Marked as pending' : 'Marked as completed');
        } catch {
            message.error('Failed to update todo');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTodo(id);
            const nextTotal = Math.max(0, total - 1);
            const nextMaxPage = Math.max(1, Math.ceil(nextTotal / limit));
            const nextPage = page > nextMaxPage ? nextMaxPage : page;

            setTodos((prev) => prev.filter((t) => t.id !== id));

            setTotal(nextTotal);
            setMaxPage(nextMaxPage);
            setPage(nextPage);


        } catch {
            message.error("Failed to delete todo");
        }
    };

    // const handleFilterChange = (newFilter) => {
    //     setFilter(newFilter);
    //     setPage(1);
    //     // DO NOT call setSearchText("") — keep search so it searches inside the new filter
    //     // load() will run via useEffect because filter changed
    //   };

    const handleSearch = (value) => {
        setSearchText(value);
        setPage(1);
    };

    return (
        <div className="app-wrapper d-flex align-items-center justify-content-center min-vh-100 my-parent-container">
            <div className="card shadow-lg border-0 my-card my-container">
                <div className="card-body p-5">
                    <div className="text-center">
                        <span className="h3 mb-4 bg-danger d-inline-block my-title">📝 To Do List</span>
                    </div>


                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <button
                            className="btn btn-success"
                            onClick={() => {
                                setErrors({title: "", description: ""});
                                setTitle("");
                                setDescription("");
                                setShowForm(true);
                            }}
                        >
                            + Create new task
                        </button>
                    </div>

                    <div className="mb-4">
                        <SearchBar onSearch={handleSearch}/>
                    </div>

                    <div className="mb-4 text-center">
                        <FilterBar
                            value={filter}
                            onChange={(f) => {
                                setFilter(f);
                                setPage(1);
                            }}
                        />
                    </div>

                    <div className="table-responsive">
                        <TodoTable
                            todos={todos}
                            page={page}
                            total={total}
                            limit={limit}
                            loading={loading}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                            onPageChange={setPage}
                        />
                    </div>

                    <Modal
                        open={showForm}
                        onCancel={handleCancel}
                        footer={null}
                        destroyOnClose
                    >
                        <TodoForm
                            onCreate={handleCreate}
                            onCancel={handleCancel}
                            title={title}
                            setTitle={setTitle}
                            description={description}
                            setDescription={setDescription}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    </Modal>
                </div>
            </div>
        </div>
    );

}
