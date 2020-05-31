import React from 'react';
import PropTypes from 'prop-types';

class _DateMenuItem extends React.Component {
  render() {
    const { date } = this.props;
    return (
      <div>
        <div>{JSON.stringify(this)}</div>
        <div>{date}</div>
      </div>
    );
  }
}

const _DateMenu = ({ children }) => (
  <div>{children && Array.isArray(children) ? 'worked' : "didn't"}</div>
);
// const DateMenuItem = ({ children, date }) => <div>empty</div>;

_DateMenu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.instanceOf(_DateMenuItem)),
  // children: PropTypes.arrayOf(PropTypes.instanceOf(DateMenuItem)),
};
_DateMenuItem.propTypes = {
  // children: PropTypes.element,
  date: PropTypes.string,
};

export const DateMenuItem = _DateMenuItem;
export const DateMenu = _DateMenu;
