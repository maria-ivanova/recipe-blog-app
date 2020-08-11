import React from 'react';
import renderer from 'react-test-renderer';
import Routing from '../helpers/router.js';
import IndexInfo from '../../components/indexInfo.js';

describe('Index Info Component', () => {
    it('should render layout', () => {
        const tree = renderer.create(
            <Routing>
                <IndexInfo/>
            </Routing>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})