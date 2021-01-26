import { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Portal extends Component {

    el = document.createElement('div');

    // Компонент жизненного цикла для добавления тега, после рендера страницы
    componentDidMount () {
        document.body.appendChild(this.el);
    }

    // Компонент жизненного цикла для удаления тега
    componentWillUnmount() {
        document.body.removeChild(this.el);
    }

    render() {
        const {children} = this.props;

        return ReactDOM.createPortal(children, this.el);   
    }
}
