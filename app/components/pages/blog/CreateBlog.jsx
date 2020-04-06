import React from 'react'
import PropTypes from 'prop-types'
import {
  Dashboard, FieldInput, Card, HeaderPage, Button, CardTitle,
} from 'components/elements'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

const Schema = Yup.object().shape({
  name: Yup.string().required('Tidak boleh kosong'),
  position: Yup.string().required('Tidak boleh kosong'),
})

const createBlog = ({ handleCreate, isLoading }) => (
  <Dashboard topik="blog">
    <HeaderPage
      list={['Home', 'Blog', 'Create']}
      active="Create"
    >
      Blog
    </HeaderPage>
    <div className="row">
      <div className="col-md-9">
        <Card>
          <CardTitle>
            Create Kategori Term
          </CardTitle>
          <Formik
            initialValues={{
              name: '',
              position: ''
            }}
            validationSchema={Schema}
            onSubmit={(value) => {
              const valueNew = value
            //   handleCreate(valueNew)
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
                      label="Nama"
                      placeholder="Nama …"
                      error={(errors.name && touched.name) && errors.name}
                    />
                  </div>
                  <div className="col-md-12">
                    <FieldInput
                      name="position"
                      label="Posisi"
                      placeholder="Posisi …"
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
                      {isLoading ? 'Loading...' : 'Create'}
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

createBlog.propTypes = {
  handleCreate: PropTypes.func,
  isLoading: PropTypes.bool,
}

export default createBlog
