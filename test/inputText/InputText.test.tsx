import React from "react";
import {shallow, ShallowWrapper} from 'enzyme';
import {getElementByTestAttr} from '../testUtils';
import InputText from '../../src/text/InputText';

const setup = (props: any = {}, state: any = null): ShallowWrapper => {
    const wrapper = shallow(<InputText {...props}/>);
    if(state) wrapper.setState({...state})
  
    return wrapper;
}

describe('Input component is rendered correctly', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
        wrapper = setup();
    })

    test('Input wrapper is loaded', () => {
        expect(getElementByTestAttr(wrapper, 'inputText').length).toBe(1);
    });

    test('Testing required prop', () => {
        expect(getElementByTestAttr(wrapper, 'important').length).toBe(0);

        const newWrapper = setup({isRequired: true});

        expect(getElementByTestAttr(newWrapper, 'important').length).toBe(1)
    });
});