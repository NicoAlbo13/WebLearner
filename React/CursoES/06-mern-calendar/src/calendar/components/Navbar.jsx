import { useAuthStore } from "../../hooks/useAuthStore";

export const Navbar = () => {

  const { startLogout, user } = useAuthStore();

  const handleLogout = () => {
    startLogout();
  }

  return (
    <>
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                <i className="fas fa-calendar-alt"></i>
                &nbsp;
                {user.name}
            </span>

            <button className="btn btn-outline-danger" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span >Logout</span>
            </button>
        </div>
    </>
  )
}
