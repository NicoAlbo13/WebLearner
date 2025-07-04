import {Routes, Route, Navigate} from 'react-router-dom'

import { DcPage, HeroPage, MarvelPage, SearchPage } from '../pages'
import { Navbar } from '../../ui/Navbar'

export const HeroesRoutes = () => {
  return (
    <>
      <Navbar/>
      <div className="container">
        <Routes>
            <Route path='marvel' element={<MarvelPage/>}/>
            <Route path='dc' element={<DcPage/>}/>

            <Route path='search' element={<SearchPage/>}/>
            <Route path='hero/:heroId' element={<HeroPage/>}/>


            <Route path='/' element={<Navigate to='/marvel'/>}/>
        </Routes>
        </div>
    </>
  )
}
