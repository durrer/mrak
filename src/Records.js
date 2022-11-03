import React, { useState } from "react"
import { backend } from './backend.js'
import { useAsync } from "./useAsync.js";

const Records = () => {
    const [zaznamy, zaznamySettled] = useAsync(() => backend.getMyRecords());
    
    if(zaznamySettled){
        console.log(zaznamy);
    }
return <>
<p>Polib si</p>
</>;
};

export default Records;
