import { compose, withState, withHandlers } from 'recompose'
import {
  without,
  omit,
  isBoolean,
  isEmpty,
  isString,
  isNumber,
} from 'lodash'

/*
 * HOC for form manipulation
 * Needs to pass onSubmit func via props to trigger submit button
 *
 * withForms: HigherOrderComponent
 *
 * Usage:
 *
 *   const mapDispatchToProps = (dispatch) => ({
 *     onSubmit: bindActionCreators(foo, dispatch)
 *   })
 *
 *   compose(
 *     connect(
 *       () => {},
 *       mapDispatchToProps
 *     ),
 *     withForms,
 *   )(FooView)
 */

const getValue = (props, {
  type,
  name,
  value,
  checked,
}) => {
  switch (true) {
    // value='on' is default behaivour if value is not given in checkbox
    case (type === 'checkbox' && value === 'on'): {
      return checked
    }
    case type === 'checkbox': {
      const currentValue = props.form[name]
      if (!currentValue) return [value]
      if (checked) {
        return [...currentValue, value]
      }
      return without(currentValue, value)
    }
    default: {
      return value
    }
  }
}

const withForms = (input = {}, { omission } = { omission: true }) => (
  compose(
    withState(
      'form',
      'setForm',
      props => ({
        ...(props.form || {}),
        ...(input.form || {}),
      }),
    ),
    withHandlers({
      onChange: props => (event) => {
        const e = event.target || event
        const { name } = e
        const val = getValue(props, e)

        const form = omission && !isBoolean(val) && !isString(val) && !isNumber(val) && isEmpty(val)
          ? omit(props.form, name)
          : { ...props.form, [name]: val }

        props.setForm(form)
      },
      onSubmit: props => (event) => {
        event.preventDefault()
        props.onSubmit(props.form)
      },
    }),
  )
)

export default withForms
