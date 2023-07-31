import { BASE_API_URL, USER_API_URL, ITEM_API_URL, ORDER_API_URL } from "./apiConstants"

export const getAllUsers = async () => await (await fetch(`${BASE_API_URL}${USER_API_URL}`)).json()

export const createUser = async ({ firstName, lastName, email }) => {
  return await (await fetch(`${BASE_API_URL}${USER_API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, email })
  })).json()
}

export const getAllItems = async () => await (await fetch(`${BASE_API_URL}${ITEM_API_URL}`)).json()

export const createItem = async ({ title, decription, url, price, quantity }) => {
  return await (await fetch(`${BASE_API_URL}${ITEM_API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, decription, url, price, quantity })
  })).json()
}

export const getAllOrders = async () => await (await fetch(`${BASE_API_URL}${ORDER_API_URL}`)).json()

export const getApproveOrdersDueSoon = async () => await (await fetch(`${BASE_API_URL}${ORDER_API_URL}/approve-due-soon`)).json()

export const getTravelingOrdersByDateRange = async (startDate, endDate) => await (await fetch(`${BASE_API_URL}${ORDER_API_URL}/traveling-by-date-range?startDate=${startDate}&endDate=${endDate}`)).json()

export const createOrder = async ({ status, client, shippingAddress, shippingPromise, items }) => {
  return await (await fetch(`${BASE_API_URL}${ORDER_API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ createDate: new Date(), status, client, shippingAddress, shippingPromise, items })
  })).json()
}
