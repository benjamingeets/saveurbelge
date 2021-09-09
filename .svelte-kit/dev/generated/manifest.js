const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../../../src/routes/__error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/ajouter-mon-commerce.svelte"),
	() => import("../../../src/routes/deconnexion.svelte"),
	() => import("../../../src/routes/commercant/__layout.reset.svelte"),
	() => import("../../../src/routes/commercant/index.svelte"),
	() => import("../../../src/routes/commercant/edit-password.svelte"),
	() => import("../../../src/routes/commercant/informations.svelte"),
	() => import("../../../src/routes/commercant/contact.svelte"),
	() => import("../../../src/routes/commercant/shop/new.svelte"),
	() => import("../../../src/routes/commercant/shop/[id].svelte"),
	() => import("../../../src/routes/validation/mot-de-passe.svelte"),
	() => import("../../../src/routes/validation/compte.svelte"),
	() => import("../../../src/routes/validation/mail.svelte"),
	() => import("../../../src/routes/connexion.svelte"),
	() => import("../../../src/routes/recherche.svelte"),
	() => import("../../../src/routes/a-propos.svelte"),
	() => import("../../../src/routes/commerce/[slug].svelte"),
	() => import("../../../src/routes/contact.svelte"),
	() => import("../../../src/routes/admin/index.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/ajouter-mon-commerce.svelte
	[/^\/ajouter-mon-commerce\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/deconnexion.svelte
	[/^\/deconnexion\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/sitemap.xml.js
	[/^\/sitemap\.xml$/],

	// src/routes/commercant/index.svelte
	[/^\/commercant\/?$/, [c[5], c[6]], []],

	// src/routes/commercant/edit-password.svelte
	[/^\/commercant\/edit-password\/?$/, [c[5], c[7]], []],

	// src/routes/commercant/informations.svelte
	[/^\/commercant\/informations\/?$/, [c[5], c[8]], []],

	// src/routes/commercant/contact.svelte
	[/^\/commercant\/contact\/?$/, [c[5], c[9]], []],

	// src/routes/commercant/shop/new.svelte
	[/^\/commercant\/shop\/new\/?$/, [c[5], c[10]], []],

	// src/routes/commercant/shop/[id].svelte
	[/^\/commercant\/shop\/([^/]+?)\/?$/, [c[5], c[11]], [], (m) => ({ id: d(m[1])})],

	// src/routes/validation/mot-de-passe.svelte
	[/^\/validation\/mot-de-passe\/?$/, [c[0], c[12]], [c[1]]],

	// src/routes/validation/compte.svelte
	[/^\/validation\/compte\/?$/, [c[0], c[13]], [c[1]]],

	// src/routes/validation/mail.svelte
	[/^\/validation\/mail\/?$/, [c[0], c[14]], [c[1]]],

	// src/routes/connexion.svelte
	[/^\/connexion\/?$/, [c[0], c[15]], [c[1]]],

	// src/routes/recherche.svelte
	[/^\/recherche\/?$/, [c[0], c[16]], [c[1]]],

	// src/routes/a-propos.svelte
	[/^\/a-propos\/?$/, [c[0], c[17]], [c[1]]],

	// src/routes/commerce/[slug].svelte
	[/^\/commerce\/([^/]+?)\/?$/, [c[0], c[18]], [c[1]], (m) => ({ slug: d(m[1])})],

	// src/routes/contact.svelte
	[/^\/contact\/?$/, [c[0], c[19]], [c[1]]],

	// src/routes/admin/index.svelte
	[/^\/admin\/?$/, [c[0], c[20]], [c[1]]],

	// src/routes/api/get-categories.js
	[/^\/api\/get-categories\/?$/],

	// src/routes/api/last-shops.js
	[/^\/api\/last-shops\/?$/]
];

export const fallback = [c[0](), c[1]()];