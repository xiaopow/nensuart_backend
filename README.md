# nensuart_backend

HTML Structure

### [HTML Structure](#HTMLstructure)
| html | description |
|---|---|
| index.html | homepage with large caruosel, featured artworks and featured artist |
| gallery.html | to list out artwork in rows |
| product.html | detail page of a single piece of artwork |
| artists.html | list of artists and their short bio plus link to their artwork |
| artist.html | detail page of a single artist |
| cart.html | shopping cart |
| checkout.html | checkout flow page |
| about.html | page about nensuart and contact information |
| adminLogin.html | log in page for admin |
| admin.html | admin page |
| ad-orders.html | view and process orders |
| ad-products.html | view and manage products |
| ad-artists.html | view and manage artists |
| ad-admin.html | view and manage admin accounts |
| ad-users.html | view and manage user accounts |

### [Artworks](#artwork)
| Method | Path | Description |
|---|---|---|
| GET | /artworks | get all artworks, 10 items at a time, capability to scroll through 10 at a time for gallery.html page |
| GET | /artworks/{id} | get a specific artwork by id, for product.html page |
| GET | /artworks/artist/{id} | get all artworks of a specific artist, capability to scroll through 10 at a time, for artist.html and gallery.html page |
| POST | /artworks | add a new piece of artwork to database, require admin authentication |
| PUT | /artworks | update data of a piece of artwork, require admin authentication |
| DELETE | /artworks/{id} | delete a piece of artwork, require admin authentication |

### [Artists](#artwork)
| Method | Path | Description |
|---|---|---|
| GET | /artists | list all artists |
| GET | /artists/{id} | get a specific artist |
| POST | /artists | create a new artist, require admin authentication |
| PUT | /artists | edit a specific artist, require admin authentication |
| DELETE | /artists | delete a specific artist |

### [Admin](#admin)
| this api is replaced by Users |
| Method | Path | Description |
|---|---|---|
| GET | /admin | List all admins, require admin authentication |
| GET | /admin/{username} | List specific admin, require admin authentication |
| POST | /admin | Create a new admin, require admin authentication |
| DELETE | /admin/{username} | delete an admin, require admin authentication |

### [Admin Sessions](#adminSessions)
| this api is replaced by User Sessions |
| Method | Path | Description |
|---|---|---|
| POST | /admin/sessions | create a new admin session |
| GET | /admin/authenicated | check if admin is authenticated |
| DELETE | /admin/sessions | delete an admin session (Logout) |

### [Users](#users)
| Method | Path | Description |
|---|---|---|
| GET | /users | List all users, require admin authentication |
| GET | /users/{email} | Retrieve a user |
| POST | /users | Create a new user, userGroup specifies whether user is user or admin |
| POST | /users/admin | Create a new admin, userGroup specifies whether user is user or admin |
| PUT | /users/{email} | edit a user, require user or admin authentication |
| DELETE | /users/{email} | delete a user, require user or admin authentication |

### [User Sessions](#sessions)
| Method | Path | Description |
|---|---|---|
| POST | /sessions | Create a new session, with or without user account|
| PUT | /sessions | user sign in, check password, add user_id to session, |
| GET | /authenticated | Check if you are authenticated, return .user true/false .admin true/false |
| DELETE | /sessions | Delete a Session (Logout), activated when user clicks log out button, require authentication |

### [Cart](#cart)
| this api is replaced by Orders |
| Method | Path | Description |
|---|---|---|
| POST | /cart | Create a new cart, need to create session id |
| GET | /cart | get the cart with session id stored in cookie |
| GET | /cart/{id} | get a cart by id |
| PUT | /cart | edit the cart with session id stored in cookie |
| DELETE | /cart | Delete a cart |

### [Orders](#orders)
| Method | Path | Description |
|---|---|---|
| POST | /orders | Create a new order, must contain session id, items, mailing address, billing address, customer name, date, order status |
| GET | /orders | get all orders, require admin authentication |
| GET | /orders/{id} | get a specific order by id, this reference id is generated after order is complete, a simple id |
| GET | /orders/user/{user_id} | get all orders of a specifc user, require user authentication |
| PUT | /orders/{id} | edit an order, require authentication |
| DELETE | /orders/{id} | Delete an order |