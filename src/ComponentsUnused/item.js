import React, { useEffect } from 'react';

import { useMotionValue, Reorder } from 'framer-motion';


const Item = (item) => {
    const y = useMotionValue(0);
useEffect(() => {
    console.log(`I am here`, item.src);
})
    return(
        <div></div>
        // <Reorder.Item value={item} id={item} style={{y}}>
        //     <span>{item}</span>
        // </Reorder.Item>
    )
}

export default Item;