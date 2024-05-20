import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import { ServiceInterface } from "./Services";

interface FetchResponse {
    data: ServiceInterface | any;
    isPending: boolean;
    error: string | null;
}

const ServiceDetails: React.FC = () => {
    const { id } = useParams();
    const response: FetchResponse = useFetch('http://localhost:8000/blogs/' + id);
    const { data: service, isPending, error } = response;
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await fetch(`http://localhost:8000/blogs/${id}`, {
                method: 'DELETE'
            });
            navigate('/');
        } catch (error) {
            console.error(error);
            // Handle error here
        }
    };

    return (
        <>
            <div className="blog-details">
                {error && <div>{error}</div>}
                {isPending && !isPending && <div>Loading...</div>}
                {service && (
                    <article>
                        <h2>{service.title}</h2>
                        <p>Written by {service.author}</p>
                        <div>{service.body}</div>
                        <button onClick={handleClick}>Delete</button>
                    </article>
                )}
            </div>
        </>
    );
};

export default ServiceDetails;