import { Link, NavLink } from "react-router"

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark rounded-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to={'/'}>useContext</Link>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <NavLink to='/'
              className={(args)=>`nav-link ${args.isActive ? 'active':''}`}
              >
                Home
              </NavLink>
              <NavLink to='/about'
              className={(args)=>`nav-link ${args.isActive ? 'active':''}`}
              >
                About
              </NavLink>
              <NavLink to='/login'
              className={(args)=>`nav-link ${args.isActive ? 'active':''}`}
              >
                Login
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
    )
}
