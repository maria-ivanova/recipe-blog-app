import React from 'react';
import renderer from 'react-test-renderer';
import Routing from '../helpers/router.js';
import NotFound from '../../components/notFound.js';

describe('Not Found Component', () => {
    it('should render page layout', () => {
        const tree = renderer.create(
            <Routing>
                <NotFound />
            </Routing>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})