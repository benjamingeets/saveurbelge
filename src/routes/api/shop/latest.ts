export const MESSAGE = import.meta.env.VITE_DOMAIN;
export async function get({ params }) {
	return{
        body:MESSAGE
    }
};