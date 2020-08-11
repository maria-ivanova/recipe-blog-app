import React from 'react';
import renderer from 'react-test-renderer';
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
})