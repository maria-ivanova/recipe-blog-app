import React, { Component } from 'react';
import EventEmitter from 'eventemitter3';

import styles from '../styles/notifications.module.css';

const emitter = new EventEmitter();

export const notify = (type, msg) => {
    emitter.emit('notification', type, msg);
}


class Notifications extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isVisible: false,
            type: '',
            msg: ''
        }

        emitter.on('notification', (type, msg) => {
            this.showNotification(type, msg);
        })
    }

    showNotification = (type, msg) => {
        this.setState({
            isVisible: true,
            type,
            msg
        });

        this.timeout = setTimeout(() => {
            this.setState({
                isVisible: false,
                type: '',
                msg: ''
            });
        }, 5000)

        return () => clearTimeout(this.timeout);
    }

    render() {
        const { isVisible, type, msg } = this.state;

        return (
            <div className={`${styles.notifications} 
                             ${isVisible ? styles.isVisible : null} 
                             ${styles[type]}`}>
                <span>{msg}</span>
            </div>
        )
    }
}

export default Notifications;