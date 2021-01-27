import { FC } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import useCart from '@framework/cart/use-cart'
import useCustomer from '@framework/use-customer'
import { Heart, Bag } from '@components/icons'
import { useUI } from '@components/ui/context'
import DropdownMenu from './DropdownMenu'
import s from './UserNav.module.css'
import { Avatar } from '@components/common'
import Glass from '@components/icons/Glass.tsx'

interface Props {
  className?: string
}

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

const countItem = (count: number, item: any) => count + item.quantity
const countItems = (count: number, items: any[]) =>
  items.reduce(countItem, count)

const UserNav: FC<Props> = ({ className, children, ...props }) => {
  const { data } = useCart()
  const { data: customer } = useCustomer()
  const { toggleSidebar, closeSidebarIfPresent, openModal } = useUI()
  const itemsCount = Object.values(data?.line_items ?? {}).reduce(countItems, 0)

  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
        <ul className={s.list}>
          <li className={s.item} onClick={toggleSidebar}>
            <Bag />
            {itemsCount > 0 && <span className={s.bagCount}>{itemsCount}</span>}
          </li>
          <li className={s.item}>
            <Link href="/">
            <a onClick={() => openModal()}>
                <Glass />
              </a>
            </Link>
          </li>
          <li className={s.item}>
            <Link href="/wishlist">
              <a onClick={closeSidebarIfPresent} aria-label="Wishlist">
                <Heart />
              </a>
            </Link>
          </li>
          <li className={s.item}>
            {customer ? (
              <DropdownMenu />
            ) : (
              <button
                className={s.avatarButton}
                aria-label="Menu"
                onClick={() => openModal()}
              >
                <Avatar />
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default UserNav