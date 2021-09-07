const API = `${import.meta.env.VITE_API}`;

export async function get() {
    const lastests = await fetch(`${API}/last-shops`)
    const res = await lastests.json()
    return {
        body:res
    }
}