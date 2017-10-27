import { shallow, render, mount, configure } from 'enzyme';
global.shallow = shallow;
global.render = render;
global.mount = mount;

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

console.error = message => {
   throw new Error(message);
};