import {HeroCard} from '../components'
import queryString from 'query-string'
import { useForm } from '../../hooks/useForm'
import { useLocation, useNavigate } from 'react-router-dom'
import { getHeroesByName } from '../helpers/getHeroesByName'

export const SearchPage = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const {q=''} = queryString.parse( location.search )
  const heroes = getHeroesByName(q)

  const {searchText, onInputChange} = useForm({
    searchText: q,
  })

  const handleSearch = (e)=>{
    e.preventDefault();
    // if(searchText.trim().length<=1) return;

    navigate(`?q=${searchText.toLowerCase().trim()}`)
    // console.log(searchText);
    // onResetForm()
  }

  return (
    <div className='animate__animated animate__fadeIn animate__fast'>
    <h1>Search</h1>
    <hr />

    <div className="row">
      <div className="col-5">
        <h4>Searching</h4>
        <hr />

        <form onSubmit={ handleSearch } aria-label='form'>
          <input 
          type="text" 
          placeholder="Search a hero"
          className="form-control"
          name="searchText"
          autoComplete="off"
          value={searchText}
          onChange={onInputChange}
          />

          <button className="btn btn-outline-primary mt-3">
            Send
          </button>
        </form>
      </div>
      
      <div className="col-7">
        <h4>Results</h4>
        <hr />

        {
          (q==='')
          ? <div className="alert alert-primary animate__animated animate__zoomIn">Search a hero</div>
          : (heroes.length===0) && <div className="alert alert-danger animate__animated animate__headShake"><b>{q}</b> Hero not found</div>
        }
        
        {heroes.map((h)=><HeroCard key={h.id} {...h}/>)}

      </div>
    </div>
    </div>
  )
}
