
import Nav from './Nav';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <>
            <Nav></Nav>
            <Outlet></Outlet>
        </>
    );
};

export default Main;