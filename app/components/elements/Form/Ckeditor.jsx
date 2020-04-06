import CKEditor from 'ckeditor4-react'

import PropTypes from 'prop-types'
/* eslint-disable */
const Ckeditor = ({
  name,
  label,
  error,
  handleChange,
  value,
}) => (
  <div className="form-group">
    <label htmlFor={name}>
      {label}
    </label>
  
    
    <CKEditor 
      data={value}
      config={{
        extraPlugins: "justify,font,colorbutton",
        toolbarGroups: [
          { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
          {
            name: "paragraph",
            groups: ["list", "indent", "blocks", "align", "bidi"] // 'align' -> 'justify' plugin
          },
          { name: "links" },
          { name: "insert" },
          "/",
          { name: "styles" }, // 'font and fontsize' -> 'font' plugin
          { name: "colors" }, // 'colors' -> 'colorbutton' plugin
          { name: "tools" },
          { name: "others" },
          { name: "about" }
        ]
      }}
      onChange={(e) => handleChange(e.editor.getData())}
    />,
    {error && <span className="error">{error}</span>}

  </div>
)

Ckeditor.propTypes = {
  handleChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  value: PropTypes.string,
}

export default Ckeditor