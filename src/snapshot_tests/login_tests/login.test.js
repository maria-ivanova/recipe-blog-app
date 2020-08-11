import React from 'react';
import renderer from 'react-test-renderer';
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
    })
})