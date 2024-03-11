import React, { useEffect, useState } from 'react';
import './Home.css'
import Form from '../../Components/Form/Form';
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ position: 'fixed', bottom: '20px', right: '10px' }}
        onClick={handleButtonClick}
      >
        Heart Disease Prediction
      </button>
      {isModalOpen && <Form closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
}
