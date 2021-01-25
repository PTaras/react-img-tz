import React, { Component } from 'react';

import Portal from "./Portal";

import '../assets/style/Modal.css';

export default class Modal extends Component {
    constructor(props){
        super(props);
        this.state = {
            imgSrc: '',
            commentList: '',
            id: ''
        }
    }

    componentDidMount(){
        fetch(`https://tzfrontend.herokuapp.com/images/${this.props._id}`, {
            method: 'GET'
            })
        .then(res => res.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                imgSrc: result.src
            });
        },
        (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }
        );
        fetch(`https://tzfrontend.herokuapp.com/comments/${this.props._id}`, {
            method: 'GET'
            })
        .then(res => res.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                commentList: result
            });
        },
        (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }
        )
    }
    
    render() {
        const { isOpen, onCancel, onSubmit, _id } = this.props;

        const { imgSrc, commentList } = this.state;

        return (
            <>
              { isOpen &&
                <Portal>
                  <div className="modalOverlay">
                    <div className="modalWindow">
                      <div className="modalBody">
                        <div className="container">
                            <div className="row p-3">
                                <button type="button" className="btn-close" aria-label="Close" onClick={onCancel}></button>
                            
                                <div className="col-lg-8 col-sm-8">
                                    <div className="row m-1 img">
                                        <img src={imgSrc}></img>
                                    </div>
                                    <div className="row m-3">
                                        <input type="text" placeholder="Ваше имя"></input>
                                    </div>
                                    <div className="row m-3">
                                    <input type="text" placeholder="Ваш комментарий"></input>
                                    </div>
                                    <div className="row m-3">
                                    <button type="button" className="close btn btn-primary" onClick={onSubmit}>
                                            Отправить комментарий  
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-3">
                                    <div className="row">
                                        {commentList.map(comment =>(
                                            <div key={comment.id}>
                                                <p>{comment.name}</p>
                                                <b>{comment.description}</b>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Portal>
              }
            </>
          );
    }
}


