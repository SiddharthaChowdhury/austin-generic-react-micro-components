import React from "react";
import Enzyme, {shallow, ShallowWrapper} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {getElementByTestAttr} from './testUtils';
import {Login} from "../src/login/Login";

Enzyme.configure({adapter: new EnzymeAdapter()});

const setup = (props: any = {}, state: any = null) => {
    const wrapper = shallow(<Login {...props}/>);
    if(state) wrapper.setState({...state})
  
    return wrapper;
}

test('Renders without error', () => {
    const wrapper = setup();
    // console.log(wrapper.debug())
    expect(getElementByTestAttr(wrapper, 'login')).toBeTruthy()
});