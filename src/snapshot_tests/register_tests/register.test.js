import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Routing from '../helpers/router.js';
import Register from '../../components/register.js';

describe('Register Component', () => {
    it('should render page layout', () => {
        const tree = renderer.create(
            <Routing>
                <Register />
            </Routing>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should change the state email when onChange function of the email input is invoked', () => {
        const wrapper = mount(
            <Routing>
                <Register />
            </Routing>
        )  

        let component = wrapper.find('Register');
        component.find('input[name="email"]').simulate('change',
            { target: { name: 'email', value: 'test@test.com' } }
        );
      
        expect(component.state('email')).toEqual('test@test.com');
    })
})