import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import Routing from '../helpers/router.js';
import MyItems from '../../components/myItems.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faHeart } from '@fortawesome/free-solid-svg-icons';
library.add(faUser, faHeart);

describe('My items page Component', () => {
    it('should render layout missing items', () => {
        const tree = renderer.create(
            <Routing value={{ displayName: "test", email: "test@test.com", uid: "1" }}>
                <MyItems />
            </Routing>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render layout with items', () => {
        const wrapper = mount(shallow(
            <Routing value={{ displayName: "test", email: "test@test.com", uid: "1" }}>
                <MyItems />
            </Routing>
        ).get(0))

        let component = wrapper.find('MyItems');
        component.setState({
            data: [
                {
                    category: "test category",
                    createdDate: 1597128798230,
                    creatorId: "1",
                    creatorName: "user1",
                    id: "id1",
                    imageUrl: "test url",
                    ingredients: "test ingredients",
                    likes: 1,
                    likesArr: ["id1"],
                    recipeDescription: "test description",
                    title: "test title",
                    totalTime: "30 мин.",
                    yields: "1",
                }
            ]
        });
        component = component.update();

        expect(component.find('.items_list .item').length).toBe(1);
    })

    it('test delete item', () => {
        const wrapper = mount(shallow(
            <Routing value={{ displayName: "test", email: "test@test.com", uid: "1" }}>
                <MyItems />
            </Routing>
        ).get(0))

        let component = wrapper.find('MyItems');
        component.setState({
            data: [
                {
                    category: "test category",
                    createdDate: 1597128798230,
                    creatorId: "1",
                    creatorName: "user1",
                    id: "id1",
                    imageUrl: "test url",
                    ingredients: "test ingredients",
                    likes: 1,
                    likesArr: ["id1"],
                    recipeDescription: "test description",
                    title: "test title",
                    totalTime: "30 мин.",
                    yields: "1",
                }
            ]
        });

        component.update().find('.items_list .btn_del').simulate('click');
        expect(component.find('.items_list .item').length).toBe(0);
      })

    
})
