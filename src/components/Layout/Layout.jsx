// import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Leyout = () => {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/movies">Movies</NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default Leyout;
