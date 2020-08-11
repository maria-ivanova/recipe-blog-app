import React from 'react';
import renderer from 'react-test-renderer';
import Routing from '../helpers/router.js';
import Footer from '../../components/footer.js';

jest.mock('../../components/logo.js', () => 'Logo');

describe('Footer Component', () => {
    it('should render layout', () => {
        const tree = renderer.create(
            <Routing>
                <Footer />
            </Routing>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})