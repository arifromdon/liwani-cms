/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { clearCurrentUser } from 'actions/Auth'
import logo from 'assets/images/logo_liwani.png'

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
            background: '#ffffff',
            padding: '20px'
          }}
          width="270"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={() => {
            // console.log(broken)
          }}
          onCollapse={() => {
            // console.log(collapsed, type)
          }}
        >
          <div className="card h-100">
            <div className="header-menu">
              <img src={logo} className="w-100"/>
            </div>
            <Menu mode="inline" defaultSelectedKeys={topik} style={{ background: 'transparent', marginBottom: '50px' }}>
              <Menu.Item key="dashboard">
                <Link to="/dashboard">
                  <span className="nav-text">Dashboard</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="stock">
                <Link to="/stock">
                  <span className="nav-text">Stok</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="absent">
                <Link to="/absent">
                  <span className="nav-text">Absensi</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="salary">
                <Link to="/salary">
                  <span className="nav-text">Gaji</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="recap">
                <Link to="/recap">
                  <span className="nav-text">Rekap</span>
                </Link>
              </Menu.Item>
            </Menu>
            <button
              type="button"
              onClick={this.props.logout}
              className="btn btn-logout mb-4 d-flex justify-content-center align-items-center"
            >
              <span className="nav-text mr-2">Logout</span>
              <Icon type="logout" />
            </button>
          </div>
        </Sider>
        <Layout className="contentLayout" style={{ background: '#ffffff' }}>
          <Content style={{ margin: '20px 0' }}>
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
