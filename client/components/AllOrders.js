import React, { Component } from "react";

export default class AllOrders extends Component {
//   constructor() {
//     super();
//   }
  componentDidMount(){
      this.props.
  };

    

  async viewCustomerOrders (){
    const token = window.localStorage.getItem('token');
        if (token) {
          const { data: orders } = await axios.get(`/api/customers/${req.match.params.id}/orders`, {
            headers: {
              authorization: token
            }
          })
          this.setState({ orders })
        }
    }

  render() {
    const { orders } = props || [];
    return <div>
        <div className="container" id="customerOrders">
        <h3>Recent Orders</h3>
        {orders.map((order) => (
              <div className="container" id="customerOrders" key={order.id}>
                <div className="containerLeft">
                  <h3>{order.orderStatus}</h3>
                </div>
                <div className="containerRight">
                  {order.isCart ? "🛒" : ""}
                  <p>{order.orderDate}</p>
                  <p>{order.amount}</p>
                  <small>Payment:</small>
                  <p>{order.paymentStatus}</p>
                  <p>{order.provider}</p>
                  <p>{order.cardNumber}</p>
                </div>
              </div>
        )
        )
            }
            </div>
        

         <button id="viewOrders">View Orders</button>

    </div>;
  }
}

const mapState = (state) => {
    return {};
  };
  
  const mapDispatch = (dispatch) => {
    return {
      loadOrders: () => dispatch(),
    };
  };
  
  export default connect(mapState, mapDispatch)(AllOrders);
