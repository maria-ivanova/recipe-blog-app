import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import Routing from '../helpers/router.js';
import Topmenu from '../../components/topmenu.js';

describe('Topmenu Component', () => {
    it('should render layout without categories', () => {
        const tree = renderer.create(
            <Routing>
                <Topmenu />
            </Routing>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should render layout with categories', () => {
        const wrapper = mount(
            <Routing>
                <Topmenu />
            </Routing>
        )

        let component = wrapper.find('Topmenu');
        component.setState({links: ['test category']});
        component = component.update();

        expect(component.find('.topmenu a').length).toBe(2);
    })
})