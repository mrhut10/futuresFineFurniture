import React from 'react';
import PropTypes from 'prop-types';

const _DateMenu = ({ children }) => (
  <div>{children && Array.isArray(children) ? 'worked' : "didn't"}</div>
);

class _DateMenuItem extends React.Component {
  render(){
    const { date } = this.props;
    return (
      <div>
        <div>{JSON.stringify(this)}</div>
        <div>{date}</div>
      </div>
    );
  }
}
// const DateMenuItem = ({ children, date }) => <div>empty</div>;

_DateMenu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.instanceOf(DateMenuItem)),
  // children: PropTypes.arrayOf(PropTypes.instanceOf(DateMenuItem)),
};
_DateMenuItem.propTypes = {
  children: PropTypes.element,
  date: PropTypes.string,
};

export const DateMenu = _DateMenu;
export const DateMenuItem = _DateMenuItem;
