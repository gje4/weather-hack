import { FC, useEffect, useState, useCallback } from 'react'
import { Logo, Button, Input } from '@components/ui'
import useLogin from '@framework/use-login'
import { useUI } from '@components/ui/context'
import { validate } from 'email-validator'

interface Props {}

function sayHello() {
  var response = prompt('What is your zipcode?')
  var data = JSON.stringify({ zipCode: response })
  console.log(data)

  fetch(
    'https://4v2a2id9pb.execute-api.us-east-1.amazonaws.com/dev/eventCategory',
    {
      method: 'POST',
      body: data,
      // headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }
  )
    .then((res) => res.json())
    .then(
      (result) => {
        console.log('products', result)
        // this.setState({
        //   // isLoaded: true,
        //   // items: result.items
        // })
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        })
      }
    )

  // const Http = new XMLHttpRequest()
  // let url =
  //   'https://4v2a2id9pb.execute-api.us-east-1.amazonaws.com/dev/eventCategory'
  //
  // Http.open('POST', url, true)
  // Http.setRequestHeader('Content-Type', 'application/json')
  // Http.send(data)
}

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

  return (
    <form
      onSubmit={handleLogin}
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-3">
        
        <Input type="email" placeholder="Enter Zipcode" onChange={setEmail} />

        <Button
          variant="slim"
          type="submit"
          loading={loading}
          disabled={disabled}
        >
          Submit Zipcode
        </Button>
        
      </div>
    </form>
  )
}

export default LoginView
