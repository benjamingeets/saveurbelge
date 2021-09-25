const API = `${import.meta.env.VITE_API}`;

export async function get() {
    const map = await fetch(`${API}/map`)
    const res = await map.json()
    return {
        body:res
    }
}