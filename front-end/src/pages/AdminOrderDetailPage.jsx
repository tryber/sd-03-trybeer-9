import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminOrderDetail from '../components/AdminOrderDetail';
import AdminSideBar from '../components/AdminSideBar';
import AdminOrderDetailAPI from '../services/AdminOrderService'

function AdminOrderDetailPage () {
  const { id } = useParams();
  let data;
  const [received, setReceived] = useState();

  useEffect(() => {
    AdminOrderDetailAPI(id)
    .then((response) => {
      if (response.status === 200) {
        // data = response.data;
        setReceived(response.data);
      }
    })
    .catch((error) => error); 
  }, []);

    if (received) {
      return (
        <AdminSideBar Children={<AdminOrderDetail Children={received} OrderNumber={id} />}/>
      );
    }
    else return (<div></div>);
  
}

export default AdminOrderDetailPage;
