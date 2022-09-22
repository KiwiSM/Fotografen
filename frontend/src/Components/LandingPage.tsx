import React, { useEffect, useState } from "react";

export default function LandingPage() {
    const [pokemon, setPokemon] = useState<String[]>();

    useEffect(() => {
        async function getData() {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
            const data = await response.json();
            setPokemon(data.results)
            console.log(pokemon);
        };
        getData();
    }, []);

    return (
        <h1>This is the Landing Page</h1>
    )
}