import React from "react";
import {shallow, ShallowWrapper} from 'enzyme';
import {getElementByTestAttr} from '../testUtils';
import Login from "../../src/login/Login";

const setup = (props: any = {}, state: any = null): ShallowWrapper => {
    const wrapper = shallow(<Login {...props}/>);
    if(state) wrapper.setState({...state})
  
    return wrapper;
}

describe('Login component are rendered correctly', () => {

    let wrapper: ShallowWrapper;
    beforeEach(() => {
        wrapper = setup();
    })

    test('Login wrapper is loaded', () => {
        expect(getElementByTestAttr(wrapper, 'login').length).toBe(1)
    });
    test('No error displayed initially', () => {
        expect(getElementByTestAttr(wrapper, 'error').length).toBe(0)
    });
    test('Input elements displayed', () => {
        expect(getElementByTestAttr(wrapper, 'input').length).toBe(3)
    });
    test('Login button displayed', () => {
        expect(getElementByTestAttr(wrapper, 'loginBtn').length).toBe(1)
    });
});

describe('Login prop change test', () => {
    it('Error is passed in props, should display error', () => {
        const errorMessage = 'Some error found';
        const wrapper = setup({error: errorMessage}, {errorStale: false});
        const element = getElementByTestAttr(wrapper, 'error');

        expect(element.length).toBe(1);
        expect(element.text()).toBe(errorMessage);
    })
});

describe('Login btn press test', () => {

    test('Login button pressed with no input, expect error', () => {
        const wrapper: ShallowWrapper = setup();

        expect(wrapper.state('error')).toBeUndefined();
        expect(wrapper.state('user')).toBe('');
        expect(wrapper.state('password')).toBe('');

        const form = getElementByTestAttr(wrapper, 'loginForm');

        form.simulate('submit');

        expect(wrapper.state('error')).toBeDefined();
    });

    test('Login button pressed with all input, expect NO error', () => {
        const wrapper: ShallowWrapper = setup({onLogin: () => {}}, {user: 'some@user', password: 'password'});
        const form = getElementByTestAttr(wrapper, 'loginForm');

        form.simulate('submit');

        expect(wrapper.state('error')).toBeUndefined();
    });

    test('Login button pressed with No user, expect error', () => {
        const wrapper: ShallowWrapper = setup({onLogin: () => {}}, {user: '', password: 'password'});
        const form = getElementByTestAttr(wrapper, 'loginForm');

        form.simulate('submit');

        expect(wrapper.state('error')).toBeDefined();
    });

    test('Login button pressed with No password, expect error', () => {
        const wrapper: ShallowWrapper = setup({onLogin: () => {}}, {user: 'some@user', password: ''});
        const form = getElementByTestAttr(wrapper, 'loginForm');

        form.simulate('submit');

        expect(wrapper.state('error')).toBeDefined();
    });
})

describe('Testing loading when display', () => {
    test('No leading initially', () => {
        const wrapper = setup({onLogin: () => {}});
        expect(getElementByTestAttr(wrapper, 'loading').length).toBe(0)
    })

    test('Always initial loading when btn is pressed', () => {
        const wrapper = setup({onLogin: () => {}}, {user: 'sidd', password: '12345678', loading: 'Please wait..'});
        expect(getElementByTestAttr(wrapper, 'loading').length).toBe(1)
    })
})

describe('Testing props label options', () => {
    test('Correct heading', () => {
        const label = 'Please login';
        const wrapper = setup({onLogin: () => {}, options: {formHeadingLabel: label}});

        expect(getElementByTestAttr(wrapper, 'formHeadingLabel').text()).toBe(label)
    })

    test('Correct heading', () => {
        const label = 'Please login';
        const wrapper = setup({onLogin: () => {}, options: {formHeadingLabel: label}});

        expect(getElementByTestAttr(wrapper, 'formHeadingLabel').text()).toBe(label)
    })
});