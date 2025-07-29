"use client";
import React   from 'react'
import CustomersTable from '@/sudoComponents/CustomersTable';
import useGetAllCustomers from '@/hooks/useGetAllCustomers';


const Customers = () => {
        const { data:allusers } = useGetAllCustomers();

  return (
    <div>
        <div className="mt-20 px-4">
                <CustomersTable users={allusers||[]} />
        </div>
            
    </div>
  )
}

export default Customers