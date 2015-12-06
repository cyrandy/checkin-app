import FormData from 'react-form-data'

let RegisterForm = React.createClass({
  mixins: [ FormData ],
  handleSubmit: function(e) {
    e.preventDefault()
    console.log(this.formData)
    this.props.onRegister(this.formData)
  },
  handleFileSelect: function(e) {
    e.stopPropagation()
    let file = e.target.files[0]
    if (!file.type.match('image.*')) {
      return
    }

    let reader = new FileReader()
    reader.onload = (e) => {
      this.setFormData('avatar', e.target.result)
    }

    reader.readAsDataURL(file)
  },
  render: function() {
    return (
      <form
        className='c-register-form'
        onChange={ this.updateFormData }
        onSubmit={ this.handleSubmit }>
        <input className='c-register-form' type='text' name='username' placeholder='account' />
        <input className='c-register-form' type='email' name='email' placeholder='email' />
        <input className='c-register-form' type='password' name='password' placeholder='password' />
        <input className='c-register-form' type='text' name='display_name' placeholder='name' />
        <input type='file' name='avatar' accept='image/jpeg,image/png' onChange={ this.handleFileSelect }/>
        <input className='c-register-form' type='submit' value='Login' />
      </form>
    )
  }
})
export default RegisterForm
