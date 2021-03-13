import React from 'react';
import { shallow } from 'enzyme';
import DeleteModal from '../../../../components_additional/ModalCrud';

describe('Edit category component actions', () => {
    it('button component opens modal', async () => {
        const props = {
            message: 'custom message',
            confirm: jest.fn(),
            title: 'custom title',
            close: jest.fn(),
            background: '#f4f4f4',
            borderColor: '#f4f4f4',
            iconColor: 'green',
            colorOne: 'yellow',
            colorTwo: 'grey',
            horizontal: 12,
            vertical: 15
        }
        let component = shallow(<DeleteModal {...props}/>)
        let buttons = component.find('Button');
        expect(buttons).toHaveLength(2);
    })
})