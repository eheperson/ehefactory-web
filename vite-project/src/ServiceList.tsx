import React from 'react';
import { ServiceInterface } from './Services';
import { Link } from 'react-router-dom';

interface ServicesListProps {
  services: ServiceInterface[];
  title: string;
}

const ServicesList: React.FC<ServicesListProps> = (props) => {
    const services = props.services;
    const title = props.title;

    return ( 
        <>
            <div className='blog-list'>
                <h2>{title}</h2>
                {services.map((service) => (
                    <div className='blog-preview' key={service.id}>
                        <Link to={`/services/${service.id}`}>
                            <h2>{service.title}</h2>
                            <p>{service.body}</p>
                            <p>Written by {service.author}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </>
     );
}
 
export default ServicesList;