import React, { Component } from 'react';

import Portal from "./Portal";

import '../assets/style/Modal.css';

export default class Modal extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: true,
            imgSrc: '',
            commentList: [],
            name: '',
            comment: ''
        }
    }


    //  Функция получения картинки и комментариев к ним с АПИ
    fetchImage = imageId => {
        this.setState({ isLoaded: false }); 
          fetch(`https://tzfrontend.herokuapp.com/images/${imageId}/`, {
            method: 'GET',
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
       
        fetch(`https://tzfrontend.herokuapp.com/comments/${imageId}/`, {
            method: 'GET',
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
        );
    };

    //  Функция отправки комментария на сервер
    postComment = (postName, postComment, imageId) => {
        const data = {
          "name": postName,
          "description": postComment,
          "image_id": imageId
        };
        
        fetch('https://tzfrontend.herokuapp.com/comments/add/', {
          'method': 'POST',
          'Content-Type': 'application/json',
          body: JSON.stringify(data)
            })
            .then(() => {
            this.setState({
              isLoaded: true,
              name: '',
              comment: ''
            });
        },
        (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }
        );
        if (imageId) {
          this.fetchImage(imageId);
        }
    }

    // Обработчик имени пользователя с инпута
    handleChangeName = (e) => {
      e.preventDefault();
      this.setState({ name: e.target.value });
    }

    // Обработчик комментария пользователя с инпута
    handleChangeComment = (e) => {
      e.preventDefault();
      this.setState({ comment: e.target.value });
    }

    // Обработчик отправки комментария на сервер и ререндер страницы
    handleSubmit = () => {
      let idToNumber = Number.parseInt(this.props.idImg);
      let nameToStr = this.state.name.toString();
      let commentToStr = this.state.comment.toString();
      this.postComment(nameToStr, commentToStr, idToNumber);
    }
    
     // Компонент жизненного цикла для проверки изменился ли id картинки => выполнение запроса к АПИ с текущим id
    componentDidUpdate = (prevProps) => {
        if (prevProps.idImg !== this.props.idImg) {
          this.fetchImage(this.props.idImg); 
        }
    }
      
    render() {
        const { isOpen, onCancel, error } = this.props;

        const { imgSrc, commentList, isLoaded, name, comment } = this.state;

      if (error) {
          return <p>Error</p>
      } else if (!isLoaded) {
          return <p> Loading ... </p>
      } else {
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
                      
                          <div className="col-lg-8 col-sm-12">
                              <div className="row m-1 img">
                                  <img src={imgSrc}></img>
                              </div>
                              <div className="row m-3">
                                  <input type="text" value={name} placeholder="Ваше имя" required onChange={this.handleChangeName}></input>
                              </div>
                              <div className="row m-3">
                              <input type="text" value={comment} placeholder="Ваш комментарий" required onChange={this.handleChangeComment}></input>
                              </div>
                              <div className="row m-3">
                              <button type="button" className="close btn btn-primary" onClick={this.handleSubmit}>
                                      Отправить комментарий 
                                  </button>
                              </div>
                          </div>
                          <div className="col-lg-3 col-sm-12">
                              <div className="row">
                                  { this.state.commentList.detail !== undefined ? <p>No comments</p> : commentList.map(comment =>(
                                      <div key={comment.id} className="container">
                                        <div className="row">
                                          <div className="col"><b>{comment.name}</b></div>
                                        </div>
                                        <div className="row">
                                          <div className="col"><p>{comment.description}</p></div>
                                        </div>
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
       )
      }
    }
}


