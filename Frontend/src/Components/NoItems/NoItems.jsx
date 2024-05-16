import React from 'react'

function NoItems({name,img}) {
  return (
    <div className=" container-fluid vh-100 ">
    <div className="row h-100  justify-content-center align-items-center">
      <div className="col-3 p-0">
        <div class="card border-0 text-center">
          <img
            src={img}
            class="card-img-top"
            alt="..."
          />
          <div class="card-body text-center ">
            <h5 class="card-text fw-bold">
           {name}
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default NoItems
