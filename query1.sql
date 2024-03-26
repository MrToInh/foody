use foody;
ALTER TABLE menu_item
ADD FOREIGN KEY (restaurant_id) REFERENCES restaurant(id);

ALTER TABLE order_menu_item
ADD FOREIGN KEY (order_id) REFERENCES food_order(id);

ALTER TABLE order_menu_item
ADD FOREIGN KEY (menu_item_id) REFERENCES menu_item(id);

ALTER TABLE restaurant
ADD FOREIGN KEY (address_id) REFERENCES address(id);

ALTER TABLE food_order
ADD FOREIGN KEY (restaurant_id) REFERENCES restaurant(id);

ALTER TABLE food_order
ADD FOREIGN KEY (customer_id) REFERENCES customer(id);

ALTER TABLE food_order
ADD FOREIGN KEY (customer_address_id) REFERENCES customer_address(id);

ALTER TABLE food_order
ADD FOREIGN KEY (assigned_driver_id) REFERENCES delivery_driver(id);

ALTER TABLE food_order
ADD FOREIGN KEY (order_status_id) REFERENCES order_status(id);

ALTER TABLE customer_address
ADD FOREIGN KEY (customer_id) REFERENCES customer(id);

ALTER TABLE customer_address
ADD FOREIGN KEY (address_id) REFERENCES address(id);


