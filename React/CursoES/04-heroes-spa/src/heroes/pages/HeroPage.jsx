import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroById } from "../helpers/getHeroById";
import { useMemo } from "react";


export const HeroPage = () => {

  const {heroId} = useParams();

  const hero = useMemo(()=> getHeroById(heroId), [heroId]);

  const navigate = useNavigate()

  const handleBack = ()=>{
    navigate(-1)
  }

  if(!hero){
    return <Navigate to='/marvel'/>
  }

  return (
    <div className="row mt-5">

      <div className="col-4">
        <img 
        src={`/assets/heroes/${hero.id}.jpg`} 
        alt={hero.superhero} 
        className="animate__animated animate__fast animate__zoomIn img-thumbnail"
        />
      </div>

      <div className="col-8">

        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><b>Alter Ego: </b>{hero.superhero}</li>
          <li className="list-group-item"><b>Publisher: </b>{hero.publisher}</li>
          <li className="list-group-item"><b>First Appearance: </b>{hero.first_appearance}</li>
        </ul>

        <h5 className="mt-3">Characters</h5>
        <p>{hero.characters}</p>

        <button 
        className="btn btn-outline-primary"
        onClick={handleBack}
        >
          Back
        </button>

      </div>
    </div>
  )
}
