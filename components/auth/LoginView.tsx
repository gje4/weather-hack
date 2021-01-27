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
<<<<<<< HEAD
      <span className="text-accents-7">Search by Forecast</span>
        {/* {message && (
          <div className="text-red border border-red p-3">
            {message}. Did you {` `}
            <a
              className="text-accent-9 inline font-bold hover:underline cursor-pointer"
              onClick={() => setModalView('FORGOT_VIEW')}
            >
              forgot your password?
            </a>
          </div>
        )} */}
        {/* <Input type="email" placeholder="Email" onChange={setEmail} /> */}
        <Input width="100px" type="text" placeholder="Enter Your Zipcode" onChange={setPassword} />
        
        <Button width="300px"
          
=======
        
        <Input type="email" placeholder="Enter Zipcode" onChange={setEmail} />

        <Button
>>>>>>> a1017bb9f7576ac596981923b015376de7b6a4f6
          variant="slim"
          type="submit"
          loading={loading}
          disabled={disabled}
        >
<<<<<<< HEAD
        
          Submit your Zipcode
        </Button>
        <div className="pt-1 text-center text-sm">
          {/* <span className="text-accents-7">Don't have an account?</span> */}
          {` `}
          {/* <a
            className="text-accent-9 font-bold hover:underline cursor-pointer"
            onClick={() => setModalView('SIGNUP_VIEW')}
          >
            Sign Up
          </a> */}
        </div>
=======
          Submit Zipcode
        </Button>
        
>>>>>>> a1017bb9f7576ac596981923b015376de7b6a4f6
      </div>
    </form>
  )
}

export default LoginView
