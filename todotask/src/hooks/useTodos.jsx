import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import axios from "axios";

const LOCAL_STORAGE_KEY = "optimized_todo_list";

export const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");
    const [newTodo, setNewTodo] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    const isFetched = useRef(false);

    // ✅ Load todos: localStorage first, then API if not available
    useEffect(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (stored) {
            setTodos(JSON.parse(stored));
        } else if (!isFetched.current) {
            isFetched.current = true;

            axios
                .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
                .then((res) => {
                    setTodos(res.data);
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(res.data));
                })
                .catch((err) => {
                    console.error("Failed to fetch todos:", err);
                });
        }
    }, []);

    // ✅ Sync to localStorage on every change
    useEffect(() => {
        if (todos.length > 0 ) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
        }
    }, [todos]);

    const handleAdd = useCallback(() => {
        if (newTodo.trim()) {
            const newItem = {
                id: Date.now(),
                title: newTodo,
                completed: false,
            };
            setTodos((prev) => [newItem, ...prev]);
            setNewTodo("");
        }
    }, [newTodo]);

    const handleEdit = useCallback((id, title) => {
        setEditingId(id);
        setEditText(title);
    }, []);

    const handleUpdate = useCallback(() => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === editingId ? { ...todo, title: editText } : todo
            )
        );
        setEditingId(null);
        setEditText("");
    }, [editText, editingId]);

    const handleToggle = useCallback((id) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }, []);

    const filteredTodos = useMemo(() => {
        return todos.filter((todo) => {
            if (filter === "completed") return todo.completed;
            if (filter === "pending") return !todo.completed;
            return true;
        });
    }, [todos, filter]);

    return {
        filteredTodos,
        filter,
        setFilter,
        newTodo,
        setNewTodo,
        handleAdd,
        handleEdit,
        handleUpdate,
        handleToggle,
        editingId,
        editText,
        setEditText,
    };
};
