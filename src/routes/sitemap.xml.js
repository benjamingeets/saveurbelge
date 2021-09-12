const DOMAIN = `https://${import.meta.env.VITE_DOMAIN}`;
import { API } from "$lib/env";
const getSlugs = async ()=>{
	const slugs = await fetch(`${API}/slugs`)
	const res = slugs.json()
	return res
}
export async function get() {
	const slugs = await getSlugs()
	let sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`
	sitemap = sitemap + `<url><loc>${DOMAIN}</loc></url>`
	sitemap = sitemap + `<url><loc>${DOMAIN}/recherche</loc></url>`
	sitemap = sitemap + `<url><loc>${DOMAIN}/a-propos</loc></url>`
	sitemap = sitemap + `<url><loc>${DOMAIN}/connexion</loc></url>`
	sitemap = sitemap + `<url><loc>${DOMAIN}/ajouter-mon-commerce</loc></url>`
	slugs.forEach(slug=>{
		if(slug.status ==1){
			sitemap = sitemap + `<url><loc>${DOMAIN}/commerce/${slug.slug}</loc></url>`
		}
	})
	sitemap = sitemap + "</urlset>"
	return {
		headers: {
			'context-type': "application/xml"
				},
		body: sitemap
	};
}