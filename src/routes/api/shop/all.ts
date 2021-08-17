import {Shop} from "$lib/back/shop"


const test = new Shop(
    1,
    "Magasin",
    "Le magasin",
    "Cool magasin",
    {local:true,monnaie:true,bio:true},
    "https://",
    1,
    {monday:[1],tuesday:[1],wednesday:[1],thursday:[1],friday:[1],saturday:[1],sunday:[1]},
    {instagram:"benj",facebook:"oui", website:"geets.Dev"})


const chien = [test,test];

export async function get({ params }) {
	return{
        body:chien
    }
};