import React from 'react';
import renderer from 'react-test-renderer';
import Routing from '../helpers/router.js';
import Notifications from '../../components/notifications.js';

describe('Notifications Component', () => {
    it('should render layout', () => {
        const tree = renderer.create(
            <Routing>
                <Notifications />
            </Routing>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})