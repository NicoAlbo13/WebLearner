import { useMemo } from "react";
import { getHeroesByPublisher } from "../helpers/getHeroesByPublisher"
import { HeroCard } from "./HeroCard";

export const HeroList = ({publisher}) => {

    const heroList = useMemo(()=> getHeroesByPublisher(publisher), [publisher]);

    return (
    <div className="row rows-cols-1 row-cols-md-3 g-3 animate__animated animate__fadeIn animate__fast">
        {
            heroList.map((hero)=>(
                <HeroCard key={hero.id} {...hero}/>
            ))
        }
    </div>
    )
}
