/* eslint-disable jsx-a11y/label-has-for */
import { Upload, Icon } from 'antd'
import PropTypes from 'prop-types'

const UploadButton = () => (
  <div>
    <Icon type="upload" style={{ fontSize: '2em' }} />
    <div className="text-alert">Drag files here</div>
    <div className="text-alert">
      or
      <span className="underline"> browse your computer</span>
    </div>
  </div>
)

const ImageUpload = ({ image }) => (
  <>
    <img src={image} alt="avatar" style={{ width: '100%' }} />
  </>
)

ImageUpload.propTypes = {
  image: PropTypes.any,
}

const UploadComponent = ({
  name,
  label,
  beforeUpload,
  handleChange,
  imageUrl,
  image,
}) => (
  <div className="form-group">
    <label htmlFor={name}>
      {label}
    </label>
    <Upload
      name={name}
      listType="picture-card"
      className="image-uploader"
      beforeUpload={beforeUpload}
      onChange={handleChange}
      showUploadList={false}
    >
      {imageUrl ? <ImageUpload image={imageUrl} /> : <UploadButton image={image} />}
    </Upload>
  </div>
)

UploadComponent.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  image: PropTypes.string,
  imageUrl: PropTypes.string,
  beforeUpload: PropTypes.func,
  handleChange: PropTypes.func,
}

export default UploadComponent
