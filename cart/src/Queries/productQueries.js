import { gql } from '@apollo/client';


export const GET_PRODUCTS = gql`
    query {
        getProducts{
            productId, title, description, price, stock, priceBRL
        }
    }
`;

export const GET_PRODUCT_ID = gql `
    query productId($productId: Int!) {
        getProductById(productId: $prodcutId){
            productId, title, description, price, stock, priceBRL
        }
    }
`;