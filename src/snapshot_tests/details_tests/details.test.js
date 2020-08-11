import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import Routing from '../helpers/router.js';
import Details from '../../components/Details.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faEdit } from '@fortawesome/free-solid-svg-icons';
library.add(faHeart, faEdit);

describe('Details Component', () => {
    it('should render page layout with auth user', () => {
        const tree = renderer.create(
            <Routing value={{ displayName: "test", email: "test@test.com", uid: "1" }}>
                <Details match={{ params: { id: '1' } }}/>
            </Routing>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    })

    it('should render page layout with non-auth user', () => {
        const tree = renderer.create(
            <Routing >
                <Details match={{ params: { id: '1' } }}/>
            </Routing>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    })

    it('should render button edit', async () => {
        const wrapper = mount(shallow(
            <Routing value={{ displayName: "test", email: "test@test.com", uid: "1" }}>
                <Details match={{ params: { id: '1' } }}/>
            </Routing>
        ).get(0))

        let component = wrapper.find('Details');
        component.setState({ creatorId: '1' });
        component = component.update();

        expect(component.find('a').text()).toEqual(' Редактирай');
      });

      it('should render button like', async () => {
        const wrapper = mount(shallow(
            <Routing value={{ displayName: "test", email: "test@test.com", uid: "1" }}>
                <Details match={{ params: { id: '1' } }}/>
            </Routing>
        ).get(0))

        let component = wrapper.find('Details');
        component.setState({ likesArr: [2] });
        component = component.update();

        expect(component.find('button').text()).toEqual('Добави в любими');
      });

      it('should render is liked', async () => {
        const wrapper = mount(shallow(
            <Routing value={{ displayName: "test", email: "test@test.com", uid: "1" }}>
                <Details match={{ params: { id: '1' } }}/>
            </Routing>
        ).get(0))

        let component = wrapper.find('Details');
        component.setState({ likesArr: ['1'] });
        component = component.update();

        expect(component.find('.favorites_info').text()).toEqual(' Добавена в любими');
      });
})