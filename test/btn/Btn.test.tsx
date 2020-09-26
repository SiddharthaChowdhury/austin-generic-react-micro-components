import React from "react";
import {shallow, ShallowWrapper} from 'enzyme';
import {getElementByTestAttr} from '../testUtils';
import Btn from '../../src/btn/Btn';
import {utilBtn} from '../../src/btn/utilBtn';
import {IdBtnColor} from '../../src/btn/IdBtnColor';

const setup = (props: any = {}, state: any = null): ShallowWrapper => {
    const wrapper = shallow(<Btn {...props}/>);
    if(state) wrapper.setState({...state})
  
    return wrapper;
}

describe('Btn component is rendered correctly', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
        wrapper = setup();
    })

    test('Btn wrapper is loaded', () => {
        expect(getElementByTestAttr(wrapper, 'btn').length).toBe(1);
    });

    test('Testing btn icon displayed correctly', () => {
        expect(getElementByTestAttr(wrapper, 'btn').find('.btnIcon').length).toBe(0);

        const newWrapper = setup({icon: 'IconContentDummy'});

        expect(getElementByTestAttr(newWrapper, 'btn').find('.btnIcon').length).toBe(1)
    });

    test('Testing btn text displayed correctly', () => {
        expect(getElementByTestAttr(wrapper, 'btn').find('.btnText').length).toBe(0);

        const textContent = 'TextContentDummy';
        const newWrapper = setup({text: textContent});

        expect(getElementByTestAttr(newWrapper, 'btn').find('.btnText').text()).toBe(textContent);
    });
});

describe('Testing utilBtn', () => {
    test('utilBtn is defined', () => {
        expect(utilBtn).toBeDefined();
    })
    test('utilBtn should return correct DEFAULT color class', () => {
        expect(utilBtn.getColorClass()).toEqual('btn btnDefault');
        expect(utilBtn.getColorClass(undefined, true)).toEqual('btn btnDefault');
    })
    test('utilBtn should return correct RED color class', () => {
        expect(utilBtn.getColorClass(IdBtnColor.RED)).toEqual('btn btnRedLine');
        expect(utilBtn.getColorClass(IdBtnColor.RED, true)).toEqual('btn btnRed');
    })

    test('utilBtn should return correct ORANGE color class', () => {
        expect(utilBtn.getColorClass(IdBtnColor.ORANGE)).toEqual('btn btnOrangeLine');
        expect(utilBtn.getColorClass(IdBtnColor.ORANGE, true)).toEqual('btn btnOrange');
    })

    test('utilBtn should return correct GREEN color class', () => {
        expect(utilBtn.getColorClass(IdBtnColor.GREEN)).toEqual('btn btnGreenLine');
        expect(utilBtn.getColorClass(IdBtnColor.GREEN, true)).toEqual('btn btnGreen');
    })

    test('utilBtn should return correct BLUE color class', () => {
        expect(utilBtn.getColorClass(IdBtnColor.BLUE)).toEqual('btn btnBlueLine');
        expect(utilBtn.getColorClass(IdBtnColor.BLUE, true)).toEqual('btn btnBlue');
    })
})