'use strict';

import React, { Component } from 'react';

const Header = ({title}) => (
  <div className="top-nav">
    <h1>(r<span>y</span>w)</h1>
    {title ? (<h2>{title}</h2>) : null}
    <div className="clearfix"></div>
  </div>
);

export default Header;
