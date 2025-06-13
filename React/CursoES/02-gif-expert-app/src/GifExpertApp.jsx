import { useState } from "react"
import { AddCategory, GifGrid } from "./components";

export const GifExpertApp = () => {

    const [categories, setCategories] = useState(["One Punch Man"]);

    const handleAddCategory = (newCategory)=>{
        if(categories.includes(newCategory)) return;
        setCategories([newCategory,...categories])
    }

    return (
    <>
        <h1>GifExpertApp</h1>

        <AddCategory onAddCategory={handleAddCategory}/>

        {categories.map((element)=>(
                <GifGrid key={element} category={element}/>
            )
        )}
    </>
    )
}
