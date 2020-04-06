import React from 'react'
import PropTypes from 'prop-types'
import {
  Dashboard, FieldInput, Card, HeaderPage, Button, LoadingSkeleton,
} from 'components/elements'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { isEmpty } from 'lodash'

const Schema = Yup.object().shape({
  name: Yup.string().required('Tidak boleh kosong'),
  position: Yup.string().required("Tidak boleh kosong")
})

const EditBlog = ({ categoryTerm, handleUpdate, isLoading }) => (
  <Dashboard topik="blog">
    <HeaderPage
      list={['Home', 'Blog', 'Edit']}
      active="Edit"
    >
      Blog
    </HeaderPage>
    <div className="row">
      <div className="col-md-9">
        <Card>
          <Formik
          initialValues={{
              name: '',
              position: '',
          }}
          enableReinitialize
          validationSchema={Schema}
          onSubmit={(value) => {
              const valueNew = value
              valueNew.valid_until = moment(value.valid_until).format('YYYY-MM-DD')
              handleUpdate(valueNew)
          }}
          >
          {({
              errors, touched,
          }) => (
              <Form id="formVoucher">
              <div className="row">
                  <div className="col-md-12">
                  <FieldInput
                      name="name"
                      label="Name"
                      placeholder="Name …"
                      error={(errors.name && touched.name) && errors.name}
                  />
                  </div>
                  <div className="col-md-12">
                  <FieldInput
                      name="position"
                      label="Position"
                      placeholder="Position …"
                      error={(errors.position && touched.position) && errors.position}
                  />
                  </div>
                  <div className="col-md-4 col-6" style={{ marginBottom: '50px', marginTop: '20px' }}>
                  <Button
                      typeButton="button"
                      onClick={() => window.history.back()}
                      danger
                  >
                      Cancel
                  </Button>
                  </div>
                  <div className="col-md-4 col-6" style={{ marginBottom: '50px', marginTop: '20px' }}>
                  <Button
                      disabled={isLoading}
                  >
                      {isLoading ? 'Loading...' : 'Save'}
                  </Button>
                  </div>
              </div>
              </Form>
          )}
          </Formik>
        </Card>
      </div>
    </div>
  </Dashboard>
)

EditBlog.propTypes = {
}

export default EditBlog
