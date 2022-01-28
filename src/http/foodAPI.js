import { $authHost, $host } from "./index";
// import jwt_decode from "jwt-decode";

export const createType = async(type) => {
    const { data } = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async() => {
    const { data } = await $host.get('api/type')
    return data
}

export const createBrand = async(restaurant) => {
    const { data } = await $authHost.post('api/restaurant', restaurant)
    return data
}

export const createOrder = async(order) => {
    const { data } = await $authHost.post('api/order', order)

    return data
}

export const fetchBrands = async() => {
    const { data } = await $host.get('api/restaurant', )
    return data
}


export const createFood = async(food) => {
    const { data } = await $authHost.post('api/food', food)
    return data
}

export const fetchFoods = async(typeId, restaruantId, page, limit = 5) => {
    const { data } = await $host.get('api/food', {
        params: {
            typeId,
            restaruantId,
            page,
            limit
        }
    })
    return data
}

export const fetchOneFood = async(id) => {
    const { data } = await $host.get('api/food/' + id)
    return data
}