import React, { useContext } from 'react'
import './Style.css'
import Card from '../../Components/Card/Card'
import {useProductContext} from '../../context/productContext'
import Slider from '../../Components/Slider/Slider'
export default function MedicineStore() {
  const {products}=useProductContext();
  console.log(products);
  return (
    <>
    <Slider/>
    <h1 className='text-center mt-4'>ORDER MEDICINE</h1>
      <div className="gallery gap-3 ">
        {products.map((data)=>(
             <Card key={data.id} {... data}/>
        ))}
       
      </div>
    </>
  )
}
