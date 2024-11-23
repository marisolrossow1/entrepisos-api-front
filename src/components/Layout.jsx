import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout = () => {
return <div>

    <Navigation />

    <hr />

    <Outlet />
    {/* aca es donde se renderizan todas nuestras paginas */}

</div>
}

export default Layout;
