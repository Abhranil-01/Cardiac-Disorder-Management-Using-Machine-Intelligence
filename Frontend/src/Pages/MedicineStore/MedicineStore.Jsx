import React, { useContext } from 'react'
import './Style.css'
import Card from '../../Components/Card/Card'
// import {useProductContext} from '../../context/productContext'
import Slider from '../../Components/Slider/Slider'
import { useGetmedicineDataQuery } from '../../Service/UserAuthApi'
export default function MedicineStore() {
  // const {products}=useProductContext();
  const{data:products,isLoading}=useGetmedicineDataQuery()
  console.log(products);
  console.log(products);
  return (
    <>
    <Slider/>
    <h1 className='text-center mt-4'>ORDER MEDICINE</h1>
      <div className="gallery gap-3 ">
        {products && products.map((data)=>(
             <Card key={data.id} {... data}/>
        ))}
       
      </div>
    </>
  )
}
