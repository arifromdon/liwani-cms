/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'

import { clearCurrentUser } from 'actions/Auth'

const {
  Header, Content, Sider,
} = Layout

class Dashboard extends Component {
  render() {
    const {
      children,
      topik,
    } = this.props
    return (
      <Layout>
        <Sider
          style={{
            position: 'fixed',
            height: '100%',
            zIndex: 1,
            overflowY: 'scroll',
          }}
          width="240"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={() => {
            // console.log(broken)
          }}
          onCollapse={() => {
            // console.log(collapsed, type)
          }}
        >
          <div className="logo" />
          <div className="header-menu">
            MENU
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[topik]} style={{ marginBottom: '50px' }}>
            <Menu.Item key="voucher">
              <Link to="/voucher">
                <span className="nav-text">Subscription</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="categoryVoucher">
              <Link to="/category-voucher">
                <span className="nav-text">Price</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="partner">
              <Link to="/partner">
                <span className="nav-text">Location</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="contentLayout" style={{ background: '#f4f6f9' }}>
          <Header style={{ background: '#fff', padding: 0 }}>
            <div className="header-right">
              <button
                type="button"
                onClick={this.props.logout}
              >
                Logout
              </button>
            </div>
          </Header>
          <Content style={{ margin: '94px 16px 0' }}>
            <div style={{ padding: 24, minHeight: 360 }}>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

Dashboard.propTypes = {
  children: PropTypes.any,
  topik: PropTypes.string,
  logout: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(clearCurrentUser, dispatch),
})

export default connect(null, mapDispatchToProps)(Dashboard)
