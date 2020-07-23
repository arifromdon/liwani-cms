import PropTypes from 'prop-types'
import shortid from 'shortid'

const BasicTable = ({ columns, children, idTable }) => (
  <div className="table-responsive">
    <table className="table table-striped table-bordered" id={idTable}>
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
  idTable: PropTypes.string,
}

export default BasicTable
