export default function OrdersCard({img,genre,productName,pricePerHour,quantity,orderStatus}) {
    return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex">
          <img src={img} alt="Product" className=" h-30 object-cover rounded-md mb-2"></img>
          <div className=" px-[0.5px]">
              <h2 className="text-lg font-semibold">{genre}</h2>
              <p className="text-gray-500 text-sm">{productName}</p>
              <div className="flex flex-row justify-between ">
                  <p className="text-green-600 font-bold ">$<span>{pricePerHour}</span>per/Hr</p>
                  <p className="px-10">Qty:<span>{quantity}</span></p>
              </div>
              <p>STATUS:<span>{orderStatus}</span></p>
              <button className="mt-3 bg-[#30B0C7] text-black font-semibold px-4 py-2 rounded hover:scale-105">View More</button>
          </div>   
    </div>
    );
  }