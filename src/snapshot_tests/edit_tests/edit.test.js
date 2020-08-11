import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import Routing from '../helpers/router.js';
import Edit from '../../components/edit.js';


import { library } from '@fortawesome/fontawesome-svg-core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
library.add(faUpload);

describe('Edit Component', () => {
    it('should render page layout', () => {
        const tree = renderer.create(
            <Routing value={{ displayName: "test", email: "test@test.com", uid: "1" }}>
                <Edit match={{ params: { id: '1' } }}/>
            </Routing>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    })

    it('should set new input value when state has been changed', async () => {
        const wrapper = mount(shallow(
            <Routing value={{ displayName: "test", email: "test@test.com", uid: "1" }}>
                <Edit match={{ params: { id: '1' } }}/>
            </Routing>
        ).get(0))

        let component = wrapper.find('Edit');
        component.setState({ title: 'test title' });
        component = component.update();

        expect(component.find('input[name="title"]').prop('value')).toEqual('test title');
      });

      it('should change the state title when onChange function of the title input is invoked', async () => {
        const wrapper = mount(shallow(
            <Routing value={{ displayName: "test", email: "test@test.com", uid: "vMmkqnOVIzQ2PjtoBZ9IkogAtt22" }}>
                <Edit match={{ params: { id: '1' } }}/>
            </Routing>
        ).get(0))

        let component = wrapper.find('Edit');
        component.find('input[name="title"]').simulate('change',
            { target: { name: 'title', value: 'test title' } }
        );
      
        expect(component.state('title')).toEqual('test title');
      })
})