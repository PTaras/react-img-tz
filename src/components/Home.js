import React, { Component } from 'react';

import Modal from './Modal';

import Style from '../assets/style/index.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            isOpen: false,
            images: [],
            idImg: ''
        };
    }

// Получаем картинки с АПИ
    componentDidMount () {
        fetch('https://tzfrontend.herokuapp.com/images/', {
            method: 'GET'
            })
        .then(res => res.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                images: result
            });
        },
        (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }
        )
    };

    // Обработчик открытия модального окна
    openModal = (e) => {
        this.setState({ isOpen: true, idImg: e.target.id });
      }
    
    // Обработчик отправки комментария 
    handleSubmit = () => {
        this.setState({ isOpen: false });
      }
    
    // Обработчик закрытия модального окна
    handleCancel = () => {
        this.setState({ isOpen: false });
      }

    render() {
        const {error, isLoaded, images} = this.state;

        if (error) {
            return <p>Error</p>
        } else if (!isLoaded) {
            return <p> Loading ... </p>
        } else {
            return (
                <div className="row align-items-center m-4" onChange={this.onSelect}>
                    <Modal
                        isOpen={this.state.isOpen}
                        onCancel={this.handleCancel}
                        idImg={this.state.idImg}
                    ></Modal>
                    {images.map(item => (
                        <div key={item.image_id} className="col-lg-4 col-xl-4 sm-1 p-2" style={{Style}}  >
                            <img id={item.image_id} src={item.src} alt={item.src} onClick={this.openModal}></img>
                        </div>
                    ))}
                </div>
            )
        }
    }
}
