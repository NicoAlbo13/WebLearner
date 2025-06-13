import { useLayoutEffect, useRef } from "react"

export const PokemonCard = ({id, name, sprites = []}) => {

    const h2ref = useRef();

    useLayoutEffect(() => {
    
    const {hight, width} = h2ref.current.getBoundingClientRect();
    console.log(hight, width);
    
    
    }, [name])

    return (
    <section style={{height: 200}}>
        <h2 ref={h2ref} className="text-capitalized">#{id} - {name}</h2>
        
        {/* img */}
        <div>
            {sprites.map((img)=>(
                <img key={img} src={img} alt={name+'_image'}/>
            ))}
        </div>
    </section>
  )
}
