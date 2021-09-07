const API = `${import.meta.env.VITE_API}`;

export async function get() {
    const categories = await fetch(`${API}/categories`)
    const res = await categories.json()
    return {
        body:res
    }
}