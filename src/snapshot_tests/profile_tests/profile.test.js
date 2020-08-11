import React from 'react';
import renderer from 'react-test-renderer';
import Routing from '../helpers/router.js';
import Profile from '../../components/profile.js';

jest.mock('../../components/notifications.js', () => 'Notifications');

describe('Profile Component', () => {
    it('should render page layout', () => {
        const tree = renderer.create(
            <Routing value={{ displayName: "test", email: "test@test.com", uid: "vMmkqnOVIzQ2PjtoBZ9IkogAtt22" }}>
                <Profile />
            </Routing>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})