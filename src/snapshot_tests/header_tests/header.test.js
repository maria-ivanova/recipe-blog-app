import React from 'react';
import renderer from 'react-test-renderer';

import { Header } from '../../components/header.js';
import Routing from '../helpers/router.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
library.add(faChevronDown);

jest.mock('../../components/logo.js', () => 'Logo');
jest.mock('../../components/searchForm.js', () => 'SearchForm');
jest.mock('../../components/mobileMenu.js', () => 'MobileMenu');

describe('Header Component', () => {
    it('should render auth routes', () => {
        const tree = renderer.create(
            <Routing value={{ displayName: "test", email: "test@test.com", uid: "vMmkqnOVIzQ2PjtoBZ9IkogAtt22" }}>
                <Header />
            </Routing>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should render non-auth routes', () => {
        const tree = renderer.create(
            <Routing>
                <Header />
            </Routing>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})