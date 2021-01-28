import { FC, useEffect, useState, useCallback } from 'react'
import { Logo, Button, Input } from '@components/ui'
import useLogin from '@framework/use-login'
import { useUI } from '@components/ui/context'
import { validate } from 'email-validator'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@components/ui'
import { ProductCard } from '@components/product'
import { default as Item } from './Item'

import styled from 'styled-components'

interface Props {}

const LoginView: FC<Props> = () => {
  const ItemsList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
    margin: 0 auto;
    overflow: scroll;
  `
  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [products, setproducts] = useState([])
  const [showproducts, setshowproducts] = useState(false)

  const { setModalView } = useUI()

  const login = useLogin()

  let textInput = React.createRef()

  async function handleClick() {
    console.log(textInput.current.value)

    var data = JSON.stringify({ zipCode: textInput.current.value })
    console.log(data)

    await fetch(
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
          console.log('products', result.products)
          console.log('products 1', result.products.data)
          // setState({ ...state, products: result.products.data })
          setproducts(result.products.data)
          console.log('test', { products })

          setshowproducts(true)
        },
        (error) => {
          console.log('error', error)
        }
      )
  }

  var productBox = {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    margin: 20,
    overflow: scroll,
  }

  var styleModal = {
    margin: '20px',
    width: '1300px',
    overflow: scroll,

    height: '500px',
  }
  console.log('showproducts', showproducts)
  if (!showproducts) {
    return (
      <div
        className="w-80 flex flex-col justify-between p-20"
        style={styleModal}
      >
        <div className="flex justify-center pb-12">
          <Logo width="64px" height="64px" />
        </div>
        <div className="flex flex-col space-y-3">
          <span className="text-accents-7">Search by Forecast</span>
          <input ref={textInput} placeholder="Enter Zip" />
          <Button width="300px" variant="slim" onClick={handleClick}>
            Submit your Zipcode
          </Button>
          <div className="pt-1 text-center text-sm"></div>
        </div>
        <div>
          <section style={productBox}>
            <h1>Get the Right Gear</h1>
            <picture>result</picture>
            <p>Test Test Test</p>
          </section>
        </div>
      </div>
    )
  } else
    return (
      <div
        className="w-80 flex flex-col justify-between p-20"
        style={styleModal}
      >
        <div>
          <section style={productBox}>
            <ItemsList>
              {products.map((product) => (
                <Item product={product} key={product.id} />
              ))}
            </ItemsList>
          </section>
        </div>
      </div>
    )
}

export default LoginView
