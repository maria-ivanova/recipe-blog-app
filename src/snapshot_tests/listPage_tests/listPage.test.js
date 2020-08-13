import React from 'react';
import renderer from 'react-test-renderer';
import Routing from '../helpers/router.js';
import ListPage from '../../components/listPage.js';

jest.mock('../../components/itemsList.js', () => 'ItemsList');

describe('List page Component', () => {
    it('should render page layout', () => {
        const tree = renderer.create(
            <Routing>
                <ListPage match={{ params: { categoryName: 'test category' } }}/>
            </Routing>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })

})
