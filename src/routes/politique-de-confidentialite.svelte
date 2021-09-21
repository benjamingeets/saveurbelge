<script>
    const questions = [
        {
            question:'Quelles données récolte SaveurBelge lors d\'une visite?',
            reponse:'Aucune. Même la localisation demandée lors de votre première visite n\'arrive pas sur notre serveur. Nous avons à coeur de limiter les données de nos utilisateurs au stricte minimum, c\'est à dire rien pour les visiteurs.'
        },
        {
            question:'Quelles données sont requises pour poster un commerce sur SaveurBelge?',
            reponse:'Nom, prénom, adresse e-mail et un mot de passe.'
        },
        {
            question:'Qui a accès à mes données/à qui peuvent-elles êtres transmises?',
            reponse:`Les données des utilisateurs ne sont accessibles qu'aux administrateurs de SaveurBelge et ne seront sous aucune conditions transmises à qui que ce soit.`
        },
        {
            question:'Comment supprimer mon compte SaveurBelge?',
            reponse:'Contactez nous par e-mail à l\'adresse hello[at]saveurbelge.be.'
        },
        {
            question:`D'où SaveurBelge tire son bénéfice?`,
            reponse:`De nul part, nous ne sommes pas rentables. Pour l'heure, les frais étant limités, nous assumons ces frais.`
        }
    ]
</script>

<section class="mt-10 max-w-5xl mx-auto px-2">
    <h2>Politique de confidentalité</h2>
    {#each questions as elt}
    <p class="font-bold italic my-4">{elt.question}</p>
    <blockquote class="border-left border-l-4 pl-4">{elt.reponse}</blockquote>
    <hr class="my-6 w-6/12 mx-auto"/>
    {/each}
</section>