import React from 'react';
import renderer from 'react-test-renderer';
import Routing from '../helpers/router.js';
import MySingleItem from '../../components/mySingleItem.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faHeart } from '@fortawesome/free-solid-svg-icons';
library.add(faUser, faHeart);

describe('My Single Item Component', () => {
    it('should render layout', () => {
        const tree = renderer.create(
            <Routing>
                <MySingleItem value={{
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
                    yields: "1"
                }}/>
            </Routing>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })

})
