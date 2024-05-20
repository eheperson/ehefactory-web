import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <>
      <div className="not-found">
        <h2> Sorry </h2>
        <p> Page does not exist </p>
        <h4> 404 </h4>
        <Link to="/"> Back to home ... </Link>
      </div>
    </>
  );
};

export default NotFound;