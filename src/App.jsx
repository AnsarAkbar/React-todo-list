import React, { useState } from "react";
import "./App.css"; 

const App = () => {
  let [product, setProduct] = useState("");
  let [productStore, setProductStore] = useState([]);
  let [price, setPrice] = useState("");
  let [priceStore, setPriceStore] = useState([]);
  let [editIndex, setEditIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (price.trim() !== "" && product.trim() !== "") {
      if (editIndex !== null) {
        // for update productStore
        const updatedproductStore = [...productStore];
        updatedproductStore[editIndex] = product;
        setProductStore(updatedproductStore);

        // ** for update priceStores
        const updatedpriceStores = [...priceStore];
        updatedpriceStores[editIndex] = price;
        setPriceStore(updatedpriceStores);

        setEditIndex(null);
      } else {
        setProductStore([...productStore, product]);
        setPriceStore((prev)=>[...prev, price]);
      }

      setProduct("");
      setPrice("");
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setProduct(productStore[index]);
    setPrice(priceStore[index]);
  };

  const handleDelete = (index) => {
    setProductStore(productStore.filter((_, i) => i !== index));
    setPriceStore(priceStore.filter((_, i) => i !== index));
    setEditIndex(null);
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`w-full h-screen p-10 flex flex-col items-center ${isDarkMode ? "bg-black" : "bg-white"}`}>
      <button onClick={toggleTheme} className={`mb-2 p-2 rounded-md ${isDarkMode ? " bg-slate-50 text-black" : "bg-black text-white"}`}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-10 rounded-lg shadow-md w-full md:w-1/2">
        <input
          priceStore="Enter the item priceStore (e.g., Product, Service)"
          placeholder="Product"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 mb-2 rounded-md w-full"
        />
        <input
          priceStore="text"
          value={product}
          placeholder="Price"
          onChange={(e) => setProduct(e.target.value)}
          className="border p-2 mb-2 rounded-md w-full"
        />
        <button priceStore="submit" className={`${isDarkMode?'bg-gray-500':'bg-black'} text-white p-2 rounded-md w-full`}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      {productStore.length > 0 && (
        <div className="bg-gray-600 p-5 rounded-lg w-full md:w-1/2">
          {productStore.map((element, index) => (
            <div key={index} className="flex items-center justify-between mb-2 border-white border-b pb-2">
              <p className="text-white">{index+1}. {' '}{priceStore[index]}<span className="italic ml-5">{element}</span></p>
              <div>
              <button onClick={() => handleEdit(index)} className="ml-2 bg-yellow-500 text-white p-2 rounded-md">
                Edit
              </button>
              <button onClick={() => handleDelete(index)} className="ml-2 bg-red-500 text-white p-2 rounded-md">
                Delete
              </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;