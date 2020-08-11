import React from 'react';
import renderer from 'react-test-renderer';
import Routing from '../helpers/router.js';
import Home from '../../components/home.js';

jest.mock('../../components/indexBanner.js', () => 'IndexBanner');
jest.mock('../../components/itemsList.js', () => 'ItemsList');
jest.mock('../../components/indexInfo.js', () => 'IndexInfo');

describe('Home Component', () => {
    it('should render layout', () => {
        const tree = renderer.create(
            <Routing>
                <Home/>
            </Routing>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})