import React from 'react';
import ReactDOM from 'react-dom';

// import Workspace from './Workspace';
import Grid from './Grid';
import Component from './shared/Component';

const g = new Grid({ width: 50, height: 50, scale: .5 });

const c1 = new Component({ top: 1, left: 1, width: 10, height: 2 });
const c2 = c1.copy().move({ top: 4 }).resize({ width: 5 });
const c3 = new Component({ top: 1, left: 14, height: 5, width: 10, style: { backgroundColor: 'green' } }).onMouseEnter({ height: 20, backgroundColor: 'red' });
const c4 = new Component({ height: 5, width: 5, style: { backgroundColor: 'pink' }});
c3.add(c4);

g.add(c1).add(c2).add(c3);
g.mount('#view');

// ReactDOM.render(<Workspace width={100} height={100} scale={.25} />, document.getElementById('view'));
