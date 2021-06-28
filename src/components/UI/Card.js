import classes from './Card.module.css';
import {Fragment} from 'react'

const Card = (props) => {
  return (
    <Fragment>
    <section
      className={`${classes.card} ${props.className ? props.className : ''}`}
    >
      {props.children}
    </section>
    </Fragment>
  );
};

export default Card;
