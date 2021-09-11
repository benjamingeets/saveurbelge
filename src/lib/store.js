import { writable } from "svelte/store";

export const cp = writable(7500)
export const city = writable("Tournai")
export const currentUserPage = writable("")
export const currentAdminPage = writable("")