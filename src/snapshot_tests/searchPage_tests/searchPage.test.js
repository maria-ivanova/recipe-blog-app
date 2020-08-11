import React from 'react';
import renderer from 'react-test-renderer';
import Routing from '../helpers/router.js';
import SearchPage from '../../components/searchPage.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faHeart } from '@fortawesome/free-solid-svg-icons';
library.add(faUser, faHeart);

describe('Search page Component', () => {
    it('should render layout empty result', () => {
        const tree = renderer.create(
            <Routing>
                <SearchPage location={{state: {
                    searchItems: []
                }}}/>
            </Routing>
        ).toJSON();
        
        expect(tree).toMatchSnapshot();
    })

    it('should render layout with result', () => {
        const tree = renderer.create(
            <Routing>
                <SearchPage location={{state: {
                    searchItems: [
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
                            recipeDescription: "test description" ,
                            title: "test title",
                            totalTime: "30 мин.",
                            yields: "1",
                        }
                    ]
                }}}/>
            </Routing>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    })
})