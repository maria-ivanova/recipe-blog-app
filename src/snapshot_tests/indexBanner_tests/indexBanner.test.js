import React from 'react';
import renderer from 'react-test-renderer';
import Routing from '../helpers/router.js';
import IndexBanner from '../../components/indexBanner.js';

describe('Index Banner Component', () => {
    it('should render layout', () => {
        const tree = renderer.create(
            <Routing>
                <IndexBanner/>
            </Routing>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})