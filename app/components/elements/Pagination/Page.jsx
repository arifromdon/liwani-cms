import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
/* eslint-disable */
class Page extends React.Component {
  handleClick(e) {
    const { isDisabled, pageNumber } = this.props
    e.preventDefault()
    if (isDisabled) {
      return
    }
    this.props.onClick(pageNumber)
  }

  render() {
    const {
      pageText,
      activeClass,
      itemClass,
      linkClass,
      activeLinkClass,
      disabledClass,
      isActive,
      isDisabled,
      href,
    } = this.props

    const css = cx(itemClass, {
      [activeClass]: isActive,
      [disabledClass]: isDisabled,
    })
    const linkCss = cx(linkClass, {
      [activeLinkClass]: isActive,
    })

    return (
      <li className={css} onClick={this.handleClick.bind(this)}> 
        <a className={linkCss} href={href}>
          {pageText}
        </a>
      </li>
    )
  }
}

Page.propTypes = {
  pageText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  pageNumber: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  activeClass: PropTypes.string,
  activeLinkClass: PropTypes.string,
  itemClass: PropTypes.string,
  linkClass: PropTypes.string,
  disabledClass: PropTypes.string,
  href: PropTypes.string,
}

Page.defaultProps = {
  activeClass: 'active',
  disabledClass: 'disabled',
  itemClass: undefined,
  linkClass: undefined,
  activeLinkCLass: undefined,
  isActive: false,
  isDisabled: false,
  href: '#',
}

export default Page
