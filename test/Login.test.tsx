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

describe('Login component are rendered correctly', () => {
    const wrapper = setup();

    it('Login wrapper is loaded', () => {
        expect(getElementByTestAttr(wrapper, 'login').length).toBe(1)
    });
    it('No error displayed initially', () => {
        expect(getElementByTestAttr(wrapper, 'error').length).toBe(0)
    });
    it('Input elements displayed', () => {
        expect(getElementByTestAttr(wrapper, 'login').find('input').length).toBe(3)
    });
    it('Login button displayed', () => {
        expect(getElementByTestAttr(wrapper, 'loginBtn').length).toBe(1)
    });
});

describe('Login prop change test', () => {
    it('Error is passed in props, should display error', () => {
        const errorMessage = 'Some error found';
        const wrapper = setup({error: errorMessage});
        const element = getElementByTestAttr(wrapper, 'error');
        
        expect(element.length).toBe(1);
        expect(element.text()).toBe(errorMessage);
    })
});