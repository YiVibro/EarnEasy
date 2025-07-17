
import image from "../assets/order_not_found.png";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import OrdersCard from "../components/OrdersCard";
import ordersdata from "../dummyData/ordersdata.json";
import {useNavigate} from "react-router-dom";

export default function Orders() {
  const [products, setProducts] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    setProducts(ordersdata);
  }, []);

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100 transition-colors duration-300">
      {/* Header */}
      <div className="relative flex items-center mb-6">
                 <button onClick={() => navigate('/')}>
                     <ArrowLeft className="text-black mr-4" />
                 </button>
        <h1 className="text-2xl font-bold sm:text-center sm:w-full">My Orders</h1>
      </div>

      {/* Content */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-700 dark:text-gray-300">
          <img src={image} alt="No Orders" className="w-64 mb-6" />
          <p className="text-xl font-medium">You haven't placed any order yet!!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <OrdersCard
              key={index}
              img={product.image}
              genre={product.genre}
              productName={product.productName}
              pricePerHour={product.pricePerHour}
              quantity={product.quantity}
              orderStatus={product.orderStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}
