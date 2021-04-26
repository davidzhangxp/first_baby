import React from 'react'
import { Navbar } from './Navbar'
import { Products } from './Products'


export const Home = ({user}) => {
    return (
        <div>
            <Navbar user={user}/>
            <Products user={user}/>
        </div>
    )
}
