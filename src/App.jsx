import { useEffect, useState } from 'react'
import {
  Stack,
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Select,
  HStack,
  Container,
  Radio,
  RadioGroup
} from '@chakra-ui/react'
import Header from './components/Header'

import {
  getAllUsers,
  createUser,
  getAllItems,
  createItem,
  getAllOrders,
  createOrder,
  getApproveOrdersDueSoon,
  getTravelingOrdersByDateRange
} from './services'

function App() {
  const [userShowModal, setUserShowModal] = useState(false)
  const [itemShowModal, setItemShowModal] = useState(false)
  const [orderShowModal, setOrderShowModal] = useState(false)
  const [filterShowModal, setFilterShowModal] = useState(false)
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [itemTitle, setItemTitle] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemUrl, setItemUrl] = useState('')
  const [itemPrice, setItemPrice] = useState(0)
  const [itemQuantity, setItemQuantity] = useState(0)
  const [orderStatus, setOrderStatus] = useState('')
  const [orderClient, setOrderClient] = useState('')
  const [orderShippingAddress, setOrderShippingAddres] = useState('')
  const [orderShippingPromise, setOrderShippingPromise] = useState('')
  const [orderItems, setOrderItems] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [allItems, setAllItems] = useState([])
  const [allOrders, setAllOrders] = useState([])
  const [filterType, setFilterType] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    (async () => {
      const users = await getAllUsers()
      const items = await getAllItems()
      const orders = await getAllOrders()
      setAllUsers([...users])
      setAllItems([...items])
      setAllOrders([...orders])
    })()
  }, [getAllUsers, getAllItems, getAllOrders])

  const handleCreateUser = async () => {
    const newUser = await createUser({ firstName: userFirstName, lastName: userLastName, email: userEmail })
    setAllUsers((prevUser) => [...prevUser, newUser])
    setUserShowModal(false)
    setUserFirstName('')
    setUserLastName('')
    setUserEmail('')
  }

  const handleCreateItem = async () => {
    const newItem = await createItem({ title: itemTitle, description: itemDescription, url: itemUrl, price: itemPrice, quantity: itemQuantity })
    setAllItems((prevItems) => [...prevItems, newItem])
    setItemShowModal(false)
    setItemTitle('')
    setItemDescription('')
    setItemPrice(0)
    setItemQuantity(0)
    setItemUrl('')
  }

  const handleCreateOrder = async () => {
    const newOrder = await createOrder({ status: orderStatus, client: orderClient, shippingAddress: orderShippingAddress, shippingPromise: orderShippingPromise, items: [orderItems] })
    setAllOrders((prevOrder) => [...prevOrder, newOrder])
    setOrderShowModal(false)
    setOrderStatus('')
    setOrderClient('')
    setOrderShippingAddres('')
    setOrderShippingPromise('')
    setOrderItems([])
  }

  const handleApplyFilter = async () => {
    switch (filterType) {
      case 'allOrders':
        const orders = await getAllOrders()
        setAllOrders([...orders])
        setFilterShowModal(false)
        break;
      case 'ordersApprove':
        const ordersApproved = await getApproveOrdersDueSoon()
        setAllOrders([...ordersApproved])
        setFilterShowModal(false)
        break;
      case 'ordersTraveling':
        const ordersTraveling = await getTravelingOrdersByDateRange(startDate, endDate)
        setAllOrders([...ordersTraveling])
        setFilterShowModal(false)
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Header />
      <Container w={'2xl'}>
        <Box>
          <Modal isOpen={userShowModal} onClose={() => setUserShowModal(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Agregar Usuario</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={6}>
                  <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <Input type={'text'} name={'firstName'} placeholder={'Nombre'} value={userFirstName} onChange={(e) => setUserFirstName(e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Apellido</FormLabel>
                    <Input type={'text'} name={'lastName'} placeholder={'Apellido'} value={userLastName} onChange={(e) => setUserLastName(e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type={'email'} name={'email'} placeholder={'Email'} value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button variant='ghost' mr={3} onClick={() => setUserShowModal(false)}>
                  Cancelar
                </Button>
                <Button colorScheme='blue' onClick={handleCreateUser}>Agregar Usuario</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <Box>
          <Modal isOpen={itemShowModal} onClose={() => setItemShowModal(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Agregar Item</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={6}>
                  <FormControl>
                    <FormLabel>Titulo</FormLabel>
                    <Input type={'text'} name={'title'} placeholder={'Titulo'} value={itemTitle} onChange={(e) => setItemTitle(e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Descripcion</FormLabel>
                    <Input type={'text'} name={'description'} placeholder={'Description'} value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Url</FormLabel>
                    <Input type={'text'} name={'url'} placeholder={'Url'} value={itemUrl} onChange={(e) => setItemUrl(e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Precio</FormLabel>
                    <Input type={'number'} name={'price'} placeholder={'Precio'} value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Cantidad</FormLabel>
                    <Input type={'number'} name={'quantity'} placeholder={'Cantidad'} value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} />
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button variant='ghost' mr={3} onClick={() => setItemShowModal(false)}>
                  Cancelar
                </Button>
                <Button colorScheme='blue' onClick={handleCreateItem}>Guardar Item</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <Box>
          <Modal isOpen={orderShowModal} onClose={() => setOrderShowModal(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Agregar Orden</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={6}>
                  <FormControl>
                    <FormLabel>Estado</FormLabel>
                    <Select placeholder='Seleccionar Estado' value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
                      <option value='Approve'>Aprobado</option>
                      <option value='Cancel'>Cancelado</option>
                      <option value='Delivery'>Enviado</option>
                      <option value='Traveling'>En camino</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Cliente</FormLabel>
                    <Select placeholder='Seleccionar Cliente' value={orderClient} onChange={(e) => setOrderClient(e.target.value)}>
                      {allUsers?.map(user => <option key={user._id} value={user._id}>{`${user?.firstName} ${user?.lastName}`}</option>)}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Direccion de Envio</FormLabel>
                    <Input type={'text'} name={'shippingAddress'} placeholder={'Direccion'} value={orderShippingAddress} onChange={(e) => setOrderShippingAddres(e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Promesa de Entrega</FormLabel>
                    <Input type={'date'} name={'shippingPromise'} placeholder={'Promesa de Entrega'} value={orderShippingPromise} onChange={(e) => setOrderShippingPromise(e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Items</FormLabel>
                    <Select placeholder='Seleccionar Item' value={orderItems} onChange={(e) => setOrderItems(e.target.value)}>
                      {allItems.map(item => <option key={item._id} value={item._id}>{item.title}</option>)}
                    </Select>
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button variant='ghost' mr={3} onClick={() => setOrderShowModal(false)}>
                  Cancelar
                </Button>
                <Button colorScheme='blue' onClick={handleCreateOrder}>Guardar Orden</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <Box>
          <Modal isOpen={filterShowModal} onClose={() => setFilterShowModal(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Filtros</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={6}>
                  <FormControl>
                    <RadioGroup onChange={setFilterType} value={filterType}>
                      <Stack direction='column'>
                        <Radio value='allOrders'>Todas las ordenes</Radio>
                        <Radio value='ordersApprove'>Ordenes Aprobadas (menos de 2 días para incumplir con la promesa de entrega)</Radio>
                        <Radio value='ordersTraveling'>Ordenes en camino (entre un rango de fechas)</Radio>
                        {filterType === 'ordersTraveling' && (
                          <Stack direction={'column'}>
                            <FormControl>
                              <FormLabel>Fecha Inicial</FormLabel>
                              <Input type={'date'} name={'startDate'} placeholder={'Fecha Inicial'} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Fecha Final</FormLabel>
                              <Input type={'date'} name={'endDate'} placeholder={'Fecha Final'} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </FormControl>
                          </Stack>
                        )}
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button variant='ghost' mr={3} onClick={() => setFilterShowModal(false)}>
                  Close
                </Button>
                <Button colorScheme='blue' onClick={handleApplyFilter}>Aplicar Filtros</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <HStack spacing={6} mt={22}>
          <Button onClick={() => setUserShowModal(true)}>Agregar Usuario</Button>
          <Button onClick={() => setItemShowModal(true)}>Agregar Item</Button>
          <Button onClick={() => setOrderShowModal(true)}>Agregar Orden</Button>
          <Button onClick={() => setFilterShowModal(true)}>Filtrar</Button>
        </HStack>
        <Box mt={18}>
          <TableContainer maxW={'xl'}>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Fecha de envio</Th>
                  <Th>Estado</Th>
                  <Th>Cliente</Th>
                  <Th>Direccion de envio</Th>
                  <Th>Fecha de entrega prometida</Th>
                  <Th>Items</Th>
                </Tr>
              </Thead>
              <Tbody>
                {allOrders.map(order =>
                  <Tr key={order._id}>
                    <Td>
                      {`${new Date(order.createDate).getUTCDate()}/${new Date(order.createDate).getUTCMonth()}/${new Date(order.createDate).getUTCFullYear()}`}
                    </Td>
                    <Td>{order.status}</Td>
                    <Td>{`${order.client.firstName} ${order.client.lastName}`}</Td>
                    <Td>{order.shippingAddress}</Td>
                    <Td>
                      {`${new Date(order.shippingPromise).getUTCDate()}/${new Date(order.shippingPromise).getUTCMonth()}/${new Date(order.shippingPromise).getUTCFullYear()}`}
                    </Td>
                    <Td>{order.items[0].title}</Td>
                  </Tr>)}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  )
}

export default App
