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
                <span className="nav-text">Voucher</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="categoryVoucher">
              <Link to="/category-voucher">
                <span className="nav-text">Kategori Voucher</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="partner">
              <Link to="/partner">
                <span className="nav-text">Partner</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="partnerAddress">
              <Link to="/partner-address">
                <span className="nav-text">Partner Address</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="faq">
              <Link to="/faq">
                <span className="nav-text">FAQ</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="categoryFaq">
              <Link to="/category-faq">
                <span className="nav-text">Kategori Faq</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="page">
              <Link to="/page">
                <span className="nav-text">Page</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="categoryPages">
              <Link to="/category-pages">
                <span className="nav-text">Kategori Page</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="slider">
              <Link to="/slider">
                <span className="nav-text">Slider</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="categorySlider">
              <Link to="/category-slider">
                <span className="nav-text">Kategori Slider</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="business">
              <Link to="/business">
                <span className="nav-text">Tipe Bisnis</span>
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
