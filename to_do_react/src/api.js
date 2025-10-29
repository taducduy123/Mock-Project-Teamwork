const API_BASE = "http://localhost:8000/api/v1/todos";

const buildListUrl = (filter, skip, limit, search) => {
    let url = "";
  
    if (filter === "completed") url = `${API_BASE}/filter/completed`;
    else if (filter === "pending") url = `${API_BASE}/filter/pending`;
    else url = `${API_BASE}`;
  
    const params = new URLSearchParams({ skip, limit });
    if (search && search.trim()) params.append("search", search.trim());
  
    return `${url}?${params.toString()}`;
  };
  
  export async function fetchTodos(filter = "all", skip = 0, limit = 10, search = "") {
    try {
      const url = buildListUrl(filter, skip, limit, search);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("❌ fetchTodos error:", error);
      throw error;
    }
  }
  


export async function createTodo(payload) {
    const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to add todo");
    return res.json(); // new item
}

export async function updateTodo(id, payload) {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update todo");
    return res.json();
}

export async function deleteTodo(id) {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete todo");
    return true;
}
