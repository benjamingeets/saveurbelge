<script>
import Footer from "$lib/Footer.svelte";
import Navbar from "$lib/Navbar.svelte";
import "../app.postcss";</script>
<div class="flex flex-col min-h-screen">
    <Navbar/>
    <main class="px-4 mb-auto min-h-full">
        <slot></slot>
    </main>
    <Footer/>
</div>