import React, { useState } from 'react';

const Services: React.FC = () => {
    const [services, _] = useState([
        { name: "Service 1", description: "Description 1", id:1 },
        { name: "Service 2", description: "Description 2", id:2},
        { name: "Service 3", description: "Description 3", id:3},
    ])
    return (
        <>
        <div className='services'>
            {services.map((service) => (
                <div className='service-preview' key={service.id}>
                    <h2>{service.name}</h2>
                    <p>{service.description}</p>
                </div>
            ))}

        </div>
        </>
    )
}
 
export default Services;