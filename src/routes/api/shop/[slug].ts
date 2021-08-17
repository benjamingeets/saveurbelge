//import {Shop,Schedules} from "$lib/back/shop.ts"

const test = "oui"
export async function get({ params }) {
    const slug = params.slug
	return{
        body:test
    }
};