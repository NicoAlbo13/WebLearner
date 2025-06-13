import { Link } from "react-router-dom"

export const HeroCard = ({
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
}) => {

    const path=`/assets/heroes/${id}.jpg`
  return (
    <div className="col">
        <div className="card">
            <div className="row no-gutter">
                <div className="col-4">
                    <img src={path} alt={superhero} className="card-img"/>
                </div>
                <div className="col-8">
                    <div className="card-body">
                        <h5 className="card-title">{superhero}</h5>
                        <p className="card-text">{alter_ego}</p>

                        <p>
                        {
                        (characters!=alter_ego) && characters
                        }
                        </p>

                        <p className="card-text">
                            <small className="text-muted">{first_appearance}</small>
                        </p>

                        <Link to={`/hero/${id}`}>
                        More..
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
