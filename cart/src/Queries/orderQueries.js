import { gql } from '@apollo/client';

//Mutation for order
export const SAVE_ORDER = gql`
    mutation save_order($products: [ProductInput]!, $totalPrice: Float!, $totalItens: Int!){
        saveOrder(order:{
            totalPrice: $totalPrice,
            totalItens: $totalItens
            products:$products
        }){
            totalPrice
          }
    }
`