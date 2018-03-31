import Grid from './Grid';
import Component from './shared/Component';
import Input from './components/Input';

const rgba = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`;

const g = new Grid({ width: 50, height: 34 });

const bg = new Component({ x: 0, y: 0, width: 50, height: 34 });

const header = new Component({ x: 0, y: 0, width: 50, height: 3 });
const logo = new Component({ x: 0, y: 0, width: 3, height: 3, fill: 'rgba(0, 0, 255, 0.3)' });
const search = new Input({ x: 4, y: 1, width: 10 });
const link1 = new Component({ x: 15, y: 1, width: 2, height: 1 });
const link2 = link1.copy().move({ x: 3 });
const link3 = link2.copy().move({ x: 3 });
const link4 = link3.copy().move({ x: 3 });
const link5 = link4.copy().move({ x: 20.5 });
const profile =  new Component({ x: 47.5, y: 0.5, width: 2, height: 2, rounded: 1 });
header.add(logo).add(search).add(link1).add(link2).add(link3).add(link4).add(link5).add(profile);

const sidebar = new Component({ x: 0, y: 3, width: 10, height: 32, fill: rgba(0, 0, 0, 0.01) });
// Search
sidebar.add( new Input({ x: 1, y: 1, width: 8 }) );
for(let i = 0; i < 10; i++) {
  sidebar.add( new Component({ x: 1, y: 3 + (i * 2), width: Math.floor(Math.random() * 5 + 4) }) );
}

const main = new Component({ x: 10, y: 3, width: 40, height: 32, fill: rgba(0, 0, 0, 0) });
// Header text
main.add( new Component({ x: 1, y: 1, width: 10, height: 2 }) );
// subheader
main.add( new Component({ x: 1, y: 4, width: 17, height: 1 }) );
// image
main.add( new Component({ x: 19, y: 1, width: 20, height: 13, fill: rgba(180, 20, 40, 0.3) }) );
// shortened paragraph text
main.add( new Component({ x: 1, y: 7, width: Math.floor(Math.random() * 5 + 13), height: 1 }) );
main.add( new Component({ x: 1, y: 9, width: Math.floor(Math.random() * 5 + 13), height: 1 }) );
main.add( new Component({ x: 1, y: 11, width: Math.floor(Math.random() * 5 + 13), height: 1 }) );
main.add( new Component({ x: 1, y: 13, width: Math.floor(Math.random() * 5 + 13), height: 1 }) );
// long paragraph text
main.add( new Component({ x: 1, y: 15, width: Math.floor(Math.random() * 5 + 34), height: 1 }) );
main.add( new Component({ x: 1, y: 17, width: Math.floor(Math.random() * 5 + 34), height: 1 }) );
main.add( new Component({ x: 1, y: 19, width: Math.floor(Math.random() * 5 + 34), height: 1 }) );
main.add( new Component({ x: 1, y: 21, width: Math.floor(Math.random() * 5 + 34), height: 1 }) );
main.add( new Component({ x: 1, y: 23, width: Math.floor(Math.random() * 5 + 34), height: 1 }) );
main.add( new Component({ x: 1, y: 25, width: Math.floor(Math.random() * 5 + 34), height: 1 }) );
main.add( new Component({ x: 1, y: 27, width: Math.floor(Math.random() * 5 + 34), height: 1 }) );
main.add( new Component({ x: 1, y: 29, width: Math.floor(Math.random() * 5 + 34), height: 1 }) );

bg.add(header).add(sidebar).add(main);

g.add(bg);

g.mount('#view');
