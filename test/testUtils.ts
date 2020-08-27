import { ShallowWrapper } from "enzyme";

/**
 * Return Node with the given data-test attribute
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper
 * @param {string} val - Value for data-test="?"
 */
export const getElementByTestAttr = (wrapper: ShallowWrapper, val: string) => {
    return wrapper.find(`[data-test='${val}']`);
}