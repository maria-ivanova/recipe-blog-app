import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Routing from '../helpers/router.js';
import Login from '../../components/login.js';

describe('Login Component', () => {
    it('should render page layout', () => {
        const tree = renderer.create(
            <Routing>
                <Login />
            </Routing>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should change the state email when onChange function of the email input is invoked', () => {
        const wrapper = mount(
            <Routing>
                <Login />
            </Routing>
        )  

        let component = wrapper.find('Login');
        component.find('input[name="email"]').simulate('change',
            { target: { name: 'email', value: 'test@test.com' } }
        );
      
        expect(component.state('email')).toEqual('test@test.com');
    })
})