import React from "react";

function HeaderAdmin({ page = '' }) {
  const isInputDisabled = page === 'edit' || page === 'create';

  return (
    <nav className="navbar default-layout-navbar mb-2 row ">
      <div className="col">
        <div className="navbar-menu-wrapper d-flex align-items-stretch p-0 justify-content-between">
          <div className="search-field d-none d-xl-block">
            <form className="d-flex align-items-center h-100" action="#">
              {/* {isInputDisabled && (
              )} */}
                <div className="input-group rounded">
                  <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" disabled={isInputDisabled} />
                  <span className="input-group-text border-0" id="search-addon">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HeaderAdmin;
