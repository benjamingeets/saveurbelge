const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/ajouter-mon-commerce.svelte"),
	() => import("../../../src/routes/commercant/index.svelte"),
	() => import("../../../src/routes/connexion.svelte"),
	() => import("../../../src/routes/recherche.svelte"),
	() => import("../../../src/routes/a-propos.svelte"),
	() => import("../../../src/routes/commerce/[slug].svelte"),
	() => import("../../../src/routes/admin/index.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/ajouter-mon-commerce.svelte
	[/^\/ajouter-mon-commerce\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/commercant/index.svelte
	[/^\/commercant\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/connexion.svelte
	[/^\/connexion\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/recherche.svelte
	[/^\/recherche\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/a-propos.svelte
	[/^\/a-propos\/?$/, [c[0], c[7]], [c[1]]],

	// src/routes/commerce/[slug].svelte
	[/^\/commerce\/([^/]+?)\/?$/, [c[0], c[8]], [c[1]], (m) => ({ slug: d(m[1])})],

	// src/routes/admin/index.svelte
	[/^\/admin\/?$/, [c[0], c[9]], [c[1]]],

	// src/routes/api/test.ts
	[/^\/api\/test\/?$/]
];

export const fallback = [c[0](), c[1]()];