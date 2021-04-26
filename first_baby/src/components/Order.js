import React, { Component } from 'react'
import { db } from '../config/Config';

export class Order extends Component {
    state = { baskets:[],products:[]}
    componentDidMount(){
        const user = this.props.user
        db.collection("basket")
        .where("userId", "==", user.objectId)
        .get()
        .then((baskets) => {
          if (baskets.empty) {
            return <div>No products in your cart</div>;
          } else {
            const data = baskets.docs.map((doc) => doc.data());
            console.log(data);
            this.setState({baskets:data})
          }
        });
        
    }
    render() {
        const baskets = this.state.baskets
        if(baskets == null){
          return (<div>product is empty</div>)
      } 
        return (
            <div>
                {baskets.map(basket =><div>{basket.productId}</div>)}
            </div>
        )
    }
}

export default Order
