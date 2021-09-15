<script>
import Head from "$lib/Head.svelte";
import {DOMAIN} from "$lib/env"

</script>
<Head title="A propos - SaveurBelge" lien="a-propos"/>

<main>
    <div class="w-full rounded-md h-60 bg-grey flex justify-center items-center mb-20" style={`background-image:url(${DOMAIN}/images/a_propos.webp);background-size:cover;background-position:center;`}>
        <h2>A propos</h2>
    </div>
    <article class="max-w-5xl mx-auto">
        <div class="flex flex-wrap">
            <div class="w-12/12 md:w-6/12 md:pr-4">
                <h2 class="text-noir">Notre mission</h2>
                <p class="py-6">Nous avons à coeur d'offrir aux belges un moyen simple et efficace d'acheter aux producteurs près de chez eux. Il peut être compliqué de trouver des petits commerçants locaux, c'est pourquoi nous avons créé SaveurBelge.</p>
                <p class="pb-3">Toujours en accord avec nos principes, nous ne récoltons aucune donnée sur les visiteurs du site. Votre localisation vous est demandée, elle n'est pas requise et ne transite <span class="underline">jamais</span> sur nos serveurs. Elle sert uniquement à obtenir votre code postal depuis OpenStreetMap.</p>
            </div>
            <div class="w-12/12 md:w-6/12">
                <img class="rounded-md" src={`${DOMAIN}/images/notre_mission.webp`} alt="Notre mission">
            </div>
        </div>
        <div class="mt-10">
            <h2 class="text-noir">Notre équipe</h2>
            <p class="py-6">Nous sommes 2 étudiants de la région de Tournai. Afin de parfaire nos connaissances, nous avons conçu, designé, prototypé, développé et mis en ligne SaveurBelge. <a target="_blank" href="https://geets.dev">Benjamin Geets</a> s'est chargé de la partie technique (développement/mise en ligne/...) alors que <a target="_blank" href="https://galandtristan.be">Galand Tristan</a> s'est occupé de la partie artistique (UX/UI, design, logo,...)</p>
            <div>
                <div class="rounded-md w-full h-80" style={`background-image:url(${DOMAIN}/images/notre_equipe.webp);background-size:cover;`}></div>
            </div>
        </div>
    </article>
</main>