import { FC, useEffect, useState, useCallback } from 'react'
import { Logo, Button, Input } from '@components/ui'
import useLogin from '@framework/use-login'
import { useUI } from '@components/ui/context'
import { validate } from 'email-validator'

interface Props {}

const LoginView: FC<Props> = () => {
  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const { setModalView, closeModal } = useUI()

  const login = useLogin()

  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    try {
      setLoading(true)
      setMessage('')
      await login({
        email,
        password,
      })
      setLoading(false)
      closeModal()
    } catch ({ errors }) {
      setMessage(errors[0].message)
      setLoading(false)
    }
  }

  const handleValidation = useCallback(() => {
    // Test for Alphanumeric password
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)

    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email) || password.length < 7 || !validPassword)
    }
  }, [email, password, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  var styleModal = {
    margin: '20px',
    width: '1300px',
    height: '500px',
  };
  
  
  return (
    <form
      onSubmit={handleLogin}
      className="w-80 flex flex-col justify-between p-20" style={styleModal}>
      <div className="flex justify-center pb-12" >
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-3">
      <span className="text-accents-7">Search by Forecast</span>
        
        <Input width="100px" type="text" placeholder="Enter Your Zipcode" onChange={setPassword} />
        
        <Button width="300px"
          
          variant="slim"
          type="submit"
          loading={loading}
          disabled={disabled}
        >
        
          Submit your Zipcode
        </Button>
        
      </div>
    </form>
  )
}

export default LoginView