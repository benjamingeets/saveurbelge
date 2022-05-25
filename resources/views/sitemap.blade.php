
@php echo '<?xml version="1.0" encoding="UTF-8"?>' @endphp
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>{{ route('shop.index') }}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>{{ route('shop.list') }}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>{{ route('shop.create') }}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
	@foreach ($shops as $shop)
	<url>
	  <loc>{{ route('shop.show', $shop->slug) }}</loc>
	  <lastmod>{{ $shop->updated_at->tz('UTC')->toAtomString() }}</lastmod>
	  <changefreq>monthly</changefreq>
	  <priority>0.8</priority>
	</url>
	@endforeach
</urlset>