import { gql } from '@apollo/client';


export const GET_PRODUCTS = gql`
    query {
        getProducts{
            id, productId, title, description, price, stock
        }
    }
`