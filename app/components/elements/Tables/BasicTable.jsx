import PropTypes from 'prop-types'
import shortid from 'shortid'

const BasicTable = ({ columns, children }) => (
  <div className="table-responsive">
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          {
            columns.map(column => (
              <th key={shortid.generate()}>{column}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  </div>
)

BasicTable.propTypes = {
  columns: PropTypes.any,
  children: PropTypes.any,
}

export default BasicTable
