import React from 'react'
import PropTypes from 'prop-types'
import {
  Dashboard, BasicTable, Card, HeaderPage, LoadingSkeleton, Button, Pagination,
} from 'components/elements'
import { Icon } from 'antd'
import { isEmpty } from 'lodash'

const columns = ['Name', 'Posisi' ,'Action']

const BlogPage = ({
  history, categoryTerm, onDelete, handlePageChange,
}) => (
  <Dashboard topik="blog">
    <HeaderPage
      list={['Home', 'Blog']}
      active="Blog"
    >
      Blog
    </HeaderPage>
    <div className="row m-b-30 ">
      <div className="offset-md-10 col-md-2">
        <Button
          onClick={() => history.push('/blog/create')}
        >
          Add new
        </Button>
      </div>
    </div>
    <Card>
      <BasicTable columns={columns}>
          <tr>
            <td>-</td>
            <td>-</td>
            <td>
              <button
                type="button"
                className="icon-button"
                onClick={() => history.push(`/blog/1/edit`)}
              >
                <Icon type="edit" />
              </button>
              <button
                type="button"
                className="icon-button"
                onClick={() => false}
              >
                <Icon type="delete" />
              </button>
            </td>
          </tr>
      </BasicTable>
    </Card>
  </Dashboard>
)

BlogPage.propTypes = {
  categoryTerm: PropTypes.any,
  onDelete: PropTypes.func,
  history: PropTypes.any,
  handlePageChange: PropTypes.func,
}

export default BlogPage
