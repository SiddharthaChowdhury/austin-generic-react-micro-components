import React from "react";
import {shallow, ShallowWrapper} from 'enzyme';
import {getElementByTestAttr} from '../testUtils';
import {Popup} from "../../src/popup/Popup";

const setup = (props: any = {}, state: any = null): ShallowWrapper => {
    const wrapper = shallow(<Popup {...props}/>);
    if(state) wrapper.setState({...state})
  
    return wrapper;
}


describe('Popup component elemets rendered', () => {
    let wrapper: ShallowWrapper;
    let trigger: React.ReactNode = null;

    beforeEach(() => {
        trigger = <button data-test={'popupTriggerBtn'}>Click</button>;
        // content = <div data-test={'popupContent'}>hello content</div>;
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('Should render trigger', () => {
        wrapper = setup({trigger})
        expect(getElementByTestAttr(wrapper, 'popup-trigger').length).toBe(1)
    })
});