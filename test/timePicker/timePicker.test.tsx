import React from "react";
import {shallow, ShallowWrapper} from 'enzyme';
import {getElementByTestAttr} from '../testUtils';
import TimePicker from "../../src/timePicker/TimePicker";

const setup = (props: any = {}, state: any = null): ShallowWrapper => {
    const wrapper = shallow(<TimePicker {...props}/>);
    if(state) wrapper.setState({...state})
  
    return wrapper;
}

describe('TimePicker loaded correctly default', () => {
    let wrapper: any = null;

    beforeEach(() => {
        wrapper = setup();
    })

    test('Should load element', () => {
        expect(wrapper.length).toBe(1);
        expect(getElementByTestAttr(wrapper, 'timePicker').length).toBe(1)
    });

    test('Should display 24hr clock by default', () => {
        expect(wrapper.find('.timePicker__group').length).toBe(3); // 4 if 12 hr clock
        expect(wrapper.find('.timePicker__ampm').length).toBe(0);
    })

    test('Initial load should not contain chooser open', () => {
        expect(wrapper.find('.timePicker__group--choose').length).toBe(0);
    })

    test('Should open choose on unit click', () => {
        const hh = wrapper.find('.timePicker__hh');
        hh.simulate('click');
        expect(wrapper.find('.timePicker__group--choose').length).toBe(1);
        expect(wrapper.find('.timePicker__group--choose--ul-option').length).toBe(24);
    })
})

describe('TimePicker loaded correctly 24hr clock', () => {
    test('Should display 12hr clock', () => {
        const wrapper = setup({ampm: true});
        expect(wrapper.find('.timePicker__group').length).toBe(4);
        expect(wrapper.find('.timePicker__ampm').length).toBe(1);
    })
})

describe('Testing prop.show', () => {
    test('Second unit is not shown', () => {
        const wrapper = setup({show: [12, 12, null, 'am']})

        expect(wrapper.find('.timePicker__ss').length).toBe(0);
        expect(wrapper.find('.timePicker__ampm').length).toBe(0); // as props.ampm is not true
    })

    test('Second and Minute unit is not shown', () => {
        const wrapper = setup({show: [12, null, null, 'am'], ampm: true})

        expect(wrapper.find('.timePicker__ampm').length).toBe(1); // as props.ampm = true
        expect(wrapper.find('.timePicker__ss').length).toBe(0);
        expect(wrapper.find('.timePicker__mm').length).toBe(0);
    })

    test('Second, Minute and AMPM unit is not shown', () => {
        const wrapper = setup({show: [12, null, null, null]})

        expect(wrapper.find('.timePicker__hh').length).toBe(1);
        expect(wrapper.find('.timePicker__ampm').length).toBe(0);
        expect(wrapper.find('.timePicker__ss').length).toBe(0);
        expect(wrapper.find('.timePicker__mm').length).toBe(0);
    })

    test('on show empty array [], will only show hour', () => {
        const wrapper = setup({show: []})

        expect(wrapper.find('.timePicker__hh').length).toBe(1);
        expect(wrapper.find('.timePicker__ampm').length).toBe(0);
        expect(wrapper.find('.timePicker__ss').length).toBe(0);
        expect(wrapper.find('.timePicker__mm').length).toBe(0);
    })
});

describe('Testing close button on Choose', () => {
    test('expect close button text by prop.optionCloseText', () => {
        const closeText = 'ClosePlease';
        const wrapper = setup({optionCloseText: closeText});

        wrapper.find('.timePicker__hh').simulate('click');
        expect(wrapper.find('.timePicker__group--choose').length).toBe(1);

        const closeBtn = wrapper.find('.timePicker__group--choose').find('.timePicker__group--choose--close');
        expect(closeBtn.length).toBe(1);
        expect(closeBtn.text()).toBe(closeText);
    })

    test('expect close button onClick to close Choose', () => {
        const wrapper = setup();

        wrapper.find('.timePicker__hh').simulate('click');
        expect(wrapper.find('.timePicker__group--choose').length).toBe(1);

        const closeBtn = wrapper.find('.timePicker__group--choose').find('.timePicker__group--choose--close');
        expect(closeBtn.length).toBe(1);

        closeBtn.simulate('click');
        expect(wrapper.find('.timePicker__group--choose').length).toBe(0);
    })
})

describe('Testing prop onChange', () => {
    afterEach(() => {
        jest.clearAllMocks()
    });

    test('Expect onClick on option, Choose is closed', () => {
        const wrapper = setup();
        wrapper.find('.timePicker__hh').simulate('click');

        expect(wrapper.find('.timePicker__group--choose').length).toBe(1);
        expect(wrapper.find('.timePicker__group--choose--ul').length).toBe(1);

        const options = wrapper.find('.timePicker__group--choose--ul-option');
        expect(options.length).toBe(24)

        options.at(0).simulate('click');
        expect(wrapper.find('.timePicker__group--choose').length).toBe(0);
    })

    test('Expect props.onChange is triggered', () => {
        const onChange = jest.fn();
        const wrapper = setup({onChange});
        wrapper.find('.timePicker__hh').simulate('click');

        expect(wrapper.find('.timePicker__group--choose').length).toBe(1);

        const options = wrapper.find('.timePicker__group--choose--ul-option');

        expect(options.length).toBe(24)
        options.at(0).simulate('click');

        const timeArr = wrapper.state('timeArr')
        expect(onChange).toBeCalledWith(timeArr)
    })
})