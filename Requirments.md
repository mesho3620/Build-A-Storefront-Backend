# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
- Show (args: product id)
- Create (args: Product)[token required]
- Delete (args: Product ID)[token required]

#### Users

- Index [token required]
- Show (args: id)[token required]
- Create (args: User)[token required]
- Authenticate(args: first_name, password)
- Delete (args: id)

#### Orders

- Index
- Show (args: product id)
- Create (args: Product)[token required]
- addProduct (args: OrderID,ProductID)[token required]
- Delete (args: Product ID)[token required]
- ShowUserOrders (args: user_id) [token required]

## API Routes

#### Products

- `/products` => index => GET
- `/products/search/` => show => GET
- `/products` => destroyProduct => DELETE
- `/products` => create => POST

#### Users

- `/users` => index => GET
- `/users/search/` => show => GET
- `/users` => destroyProduct => DELETE
- `/users` => create => POST
- `users/authenticate` => authenticate => POST

#### Orders

- `/orders` => index => GET
- `/orders/search/` => show => GET
- `/orders` => destroyProduct => DELETE
- `/orders` => create => POST
- `/orders/addProduct` => addProduct => POST
- `orders/searchUserOrders` => showUserOrders => GET

## Data Shapes

#### Product

- id
- name
- price

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order[foreign key to Product.id]
- user_id [foreign key to User.id]
- status of order (active or complete)

## Daatabase schema

![Screenshot](schema.PNG.png)
![Screenshot](table1.png)
![Screenshot](table2.png)
![Screenshot](table3.png)
![Screenshot](table4.png)
![Screenshot](table5.png)
