export const sample_foods = [
  {
    id: "1",
    name: "Pizza Pepperoni",
    cookTime: "10-20",
    price: 10,
    favorite: false,
    origins: ["italy"],
    stars: 4.5,
    imageUrl: "food-1.jpg",
    tags: ["FastFood", "Pizza", "Lunch"],
  },
  {
    id: "2",
    name: "Meatball",
    cookTime: "20-30",
    price: 20,
    favorite: true,
    origins: ["persia","middle east", "china"],
    stars: 5,
    imageUrl: "food-2.jpg",
    tags: ["SlowFood", "Lunch"],
  },
  {
    id: "3",
    name: "Hamburger",
    cookTime: "15-20",
    price: 200000,
    favorite: true,
    origins: ["belgium","france"],
    stars: 3,
    imageUrl: "food-3.jpg",
    tags: ["FastFood", "Hamburger"],
  },
  {
    id: "4",
    name: "Fired Potatoes",
    cookTime: "10-20",
    price: 2,
    favorite: false,
    origins: ["belgium","freance"],
    stars: 3,
    imageUrl: "food-4.jpg",
    tags: ["FastFood", "Fry"],
  },
  {
    id: "5",
    name: "Chicken Soup",
    cookTime: "10-20",
    price: 11,
    favorite: false,
    origins: ["italy","asia"],
    stars: 3.5,
    imageUrl: "food-5.jpg",
    tags: ["SlowFood", "Soup"],
  },
  {
    id: "6",
    name: "Vegetables Pizza",
    cookTime: "40-50",
    price: 9,
    favorite: false,
    origins: ["italy"],
    stars: 4.5,
    imageUrl: "food-6.jpg",
    tags: ["FastFood", "Pizza", "Lunch"],
  },
];


export const sample_tag= [
{name: 'All', count:6},
{name: 'FastFood', count:4},
{name: 'Pizza', count: 2},
{name: 'Lunch', count:3},
{name: 'SlowFood', count:2},
{ name: 'Hamburger', count: 1 },
{ name: 'Fry', count: 1},
{ name: 'Soup', count: 1}
];


// data.js
const data = {
  users: [
      { 
        id: 1,
        username: 'Tinh',
        name: 'Nguyen Thanh Tinh',
        email: "boycodon@gmail.com",
        phonenum: "012345789",
        sex: "Male",
        birthday: "2003/01/01",
        avatarUrl: ""
      },
      { 
        id: 2,
        username: 'test',
        name: 'Nguyen Thanh test',
        email: "boyc21odon@gmail.com",
        phonenum: "01234545789",
        sex: "Female",
        birthday: "31/12/2003"
      },

      // add more users as needed
  ]
};

export default data;