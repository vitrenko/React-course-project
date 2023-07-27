import { useState } from "react";
import axios from "axios";

import { Box, Button, TextField } from "@mui/material";
import style from "./DashboardPosts.module.scss";

function DashboardPost() {
    const [newPost, setNewPost] = useState({
        title: "",
        body: "",
        tag: "",
        categories: [],
        slug: "",
        thumbnail: null,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewPost((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const {name, files} = e.target;
        setNewPost((prevState) => ({
            ...prevState,
            [name] : files[0],
        }))
    };

    const handleSubmit = async (e) => {
        try {
            const formData = new FormData();
            Object.entries(newPost).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        formData.append(key, item);
                    })
                } else {
                    formData.append(key, value);
                }
            });
            const res = await axios.post("http://localhost:5000/posts", formData, {
                headers: {
                    "content-Type": "multipart/form-data",
                },
            });
        } catch (error) {
            console.error("Error", error)
        }
    };

    const handleCategoriesChange = (e) => {
        const {value} = e.target;
        setNewPost((prevState) => ({
            ...prevState,
            categories: value.split(","),
        }));
    };

    return (
        <Box sx={{display: "flex", flexDirection: "column", width: "65%"}}>
            <h1 style={{display: "block"}}>Create new post</h1>
            <form onSubmit={handleSubmit} className={style.postForm}>
                <TextField 
                    label="Title" 
                    variant="outlined" 
                    type="text" 
                    name="title" 
                    value={newPost.title} 
                    onChange={handleChange} 
                    className={style.textField}
                    placeholder="Title"  
                />               
                <TextField 
                    label="Body" 
                    variant="outlined"
                    type="text" 
                    name="body" 
                    value={newPost.body} 
                    onChange={handleChange} 
                    className={style.textField}
                    placeholder="Body" 
                />
                <TextField 
                    label="Tag" 
                    variant="outlined"
                    type="text" 
                    name="tag" 
                    value={newPost.tag} 
                    onChange={handleChange} 
                    className={style.textField}
                    placeholder="Tag" 
                />
                <TextField 
                    label="Categories" 
                    variant="outlined"
                    type="text" 
                    name="categories" 
                    value={newPost.categories} 
                    onChange={handleCategoriesChange} 
                    className={style.textField}
                    placeholder="Categories" 
                />
                <TextField 
                    label="Slug" 
                    variant="outlined"
                    type="text" 
                    name="slug" 
                    value={newPost.slug} 
                    onChange={handleChange} 
                    className={style.textField}
                    placeholder="Slug" 
                />
                <Button
                    variant="outlined"
                    component="label"
                    className={style.button}
                >
                    Choose picture
                    <input 
                        type="file" 
                        name="thumbnail" 
                        onChange={handleFileChange} 
                        hidden
                    />
                </Button>
                

                <Button variant="contained" className={style.button} type="submit">Submit</Button>
            </form>
        </Box>
        
    )
    
};

export default DashboardPost;