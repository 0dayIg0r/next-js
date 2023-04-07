import React from 'react'

import { useParams } from 'react-router-dom'

const Products = () => {
    const { id } = useParams()
    return (
        <div>
            Products

            <span>produto selecionado {id}</span>

        </div>
    )
}

export default Products 