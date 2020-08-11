import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import Routing from '../helpers/router.js';
import Favorites from '../../components/favorites.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faHeart } from '@fortawesome/free-solid-svg-icons';
library.add(faUser, faHeart);

describe('Favorites page Component', () => {
    it('should render layout empty favorites items', () => {
        const tree = renderer.create(
            <Routing value={{ displayName: "test", email: "test@test.com", uid: "1" }}>
                <Favorites />
            </Routing>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render layout with favorites items', () => {
        const wrapper = mount(shallow(
            <Routing value={{ displayName: "test", email: "test@test.com", uid: "1" }}>
                <Favorites />
            </Routing>
        ).get(0))

        let component = wrapper.find('Favorites');
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
})
