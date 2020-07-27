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
                <ItemsList sortCriterion="createdDate" maxElements={8}/>
            </PageTitleContext.Provider>

            <PageTitleContext.Provider value=" За нас">
                <IndexInfo />
            </PageTitleContext.Provider>

            <PageTitleContext.Provider value="най-харесвани рецепти">
                <ItemsList sortCriterion="likes" maxElements={8}/>
            </PageTitleContext.Provider>
        </Fragment>
    )
}

export default Home;