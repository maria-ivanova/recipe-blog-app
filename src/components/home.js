import React, { Fragment } from 'react';

import { PageTitleContext } from '../context/context.js'

import IndexBanner from './indexBanner.js';
import ItemsList from './itemsList.js';
import IndexInfo from './indexInfo.js';

const Home = () => {
    return (
        <Fragment>
            <IndexBanner />

            <PageTitleContext.Provider value="нови рецепти">
                <ItemsList sortCriterion="createdDate"/>
            </PageTitleContext.Provider>

            <PageTitleContext.Provider value=" За нас">
                <IndexInfo />
            </PageTitleContext.Provider>

            <PageTitleContext.Provider value="най-харесвани рецепти">
                <ItemsList sortCriterion="likes"/>
            </PageTitleContext.Provider>
        </Fragment>
    )
}

export default Home;