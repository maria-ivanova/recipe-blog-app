import React from 'react';
import renderer from 'react-test-renderer';
import Routing from '../helpers/router.js';
import Create from '../../components/create.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
library.add(faUpload);

jest.mock('../../components/notifications.js', () => 'Notifications');

describe('Create Component', () => {
    it('should render page layout', () => {
        const tree = renderer.create(
            <Routing value={{ displayName: "test", email: "test@test.com", uid: "vMmkqnOVIzQ2PjtoBZ9IkogAtt22" }}>
                <Create />
            </Routing>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})