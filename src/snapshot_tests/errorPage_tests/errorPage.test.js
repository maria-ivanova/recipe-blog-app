import React from 'react';
import renderer from 'react-test-renderer';
import Routing from '../helpers/router.js';
import ErrorPage from '../../components/errorPage.js';

describe('Error page Component', () => {
    it('should render page layout', () => {
        const tree = renderer.create(
            <Routing>
                <ErrorPage />
            </Routing>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})