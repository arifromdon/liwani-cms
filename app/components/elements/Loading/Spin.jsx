import { Spin, Icon } from 'antd'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

const LoadingSpin = () => <Spin indicator={antIcon} />

export default LoadingSpin
