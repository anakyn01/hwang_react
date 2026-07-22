import React from "react";
import {TopbarContainer, TopbarSearch, 
TopbarNavbar} from './Topbar.styled';

export const Topbar:React.FC = () => {
    return(
        <>
        <TopbarContainer 
className="navbar navbar-expand navbar-light topbar static-top">
{/*Sidebar Toggle(Mobile) */}
<button className="btn btn-link d-md-none rounded-circle mr-3">
    <i className="fa fa-bars"></i>
</button>

{/*Topbar Search */}
<TopbarSearch 
className="d-none d-sm-inline-block form-inline my-2 my-md-0 mw-100 navbar-search">
<div className="input-group">
    <input type="text" 
    className="form-control bg-light border-0 small"
    placeholder="Search for.."
    />
    <div className="input-group-append">
        <button className="btn btn-primary">
            <i className="fas fa-search fa-sm"></i>
        </button>
    </div>
</div>
</TopbarSearch>

{/*Topbar Navbar */}
<TopbarNavbar className="ml-auto">
    {/*User Information */}
    <li className="nav-item dropdown no-arrow">
        <a href="#"
        className="nav-link dropdown-toggle"
        id="userDropdown"
        >
<span className="mr-2 d-none d-lg-inline text-gray-600 small"
>Douglas McGee</span>
<img className="img-profile rounded-circle"
src="./img/undraw_profile.svg"
/>        
        </a>
    </li>
</TopbarNavbar>


</TopbarContainer>
        </>
    )
}