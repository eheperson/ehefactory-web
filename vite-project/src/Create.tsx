import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create: React.FC = () => {
    const [title, setTitle] = useState<string>('propet musa');
    const [body, setBody] = useState<string>('');
    const [author, setAuthor] = useState<string>('mario');
    const [isPending, setIsPending] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const blog = { title, body, author };
        setIsPending(true);
        
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const response = await fetch("http://localhost:8000/blogs", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(blog)
            });

            if (response.ok) {
                console.log("new blog added");
                navigate('/'); // navigate to home page
            } else {
                console.log("Failed to add new blog");
            }
        } catch (error) {
            console.log("An error occurred while adding the blog:", error);
        } finally {
            setIsPending(false);
            // history.go(-1);
        }
    }

    return (
        <div className="create">
            <h1> Add a new blog !</h1>
            <form onSubmit={handleSubmit}>
                <label> Blog Title: </label>
                <input 
                    type="text" 
                    required 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label > Blog Body: </label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label > Blog Author:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario"> Mario </option>
                    <option value="luigi"> Luigi </option>
                    <option value="alex"> Alex </option>
                </select>
                {!isPending && <button> Add Blog </button>}
                {isPending && <button disabled> Adding Blog... </button>}
                <p>{title} - {author} - {body}</p>
            </form>
        </div>
    );
}
 
export default Create;