import useFetch from './useFetch';
import ServicesList from './ServiceList';

export interface ServiceInterface {
    title: string;
    body: string;
    author: string;
    id: number;
}

const Services: React.FC = () => {
    const { data: services, isPending, error } = useFetch('http://localhost:8000/blogs');

    return (
        <>
            {error && <div>{error}</div>}
            {isPending && !error && <div>Loading...</div>}
            {
                (services && !error && !isPending) && // Add parentheses here
                <ServicesList
                    services={services ?? []}
                    title="All Services" />
            }
            {
                (services && !error && !isPending) &&
                <ServicesList
                    services={services?.filter((blog) => blog.author === "tom") ?? []}
                    title="Tom's Services" />
            }
        </>
    )
}

export default Services;