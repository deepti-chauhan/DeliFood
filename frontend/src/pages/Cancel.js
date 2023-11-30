import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Cancel = () => {

  const navigate = useNavigate()

  useEffect(()=>{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Order did not placed!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });

    navigate('/cart')
  }, [])
 
}

export default Cancel