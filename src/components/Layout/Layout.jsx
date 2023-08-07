// import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { StyledLink } from './Layout.styled';
import Loader from 'components/Loader/Loader';
import { NavContainer, PageBox } from './Layout.styled';

const Layout = () => {
  return (
    <body>
      <PageBox>
        <header>
          <NavContainer>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/movies">Movies</StyledLink>
          </NavContainer>
        </header>

        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </PageBox>
    </body>
  );
};

export default Layout;
