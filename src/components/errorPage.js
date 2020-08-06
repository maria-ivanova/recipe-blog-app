import React from 'react';
import PageTitle from './pageTitle.js';
import { PageTitleContext } from '../context/context.js';

import mainStyles from '../styles/app.module.css';

const NotFound = () => {
    return (
        <section className={`${mainStyles.sec} ${mainStyles.content_sec}`}>
            <div className={`${mainStyles.container} ${mainStyles.tcenter}`}>
                <PageTitleContext.Provider value="Грешка">
                    <PageTitle />
                </PageTitleContext.Provider>

                <h3>
                    Съжаляваме, но възникна грешка
                </h3>
            </div>
        </section>



    )

}

export default NotFound;