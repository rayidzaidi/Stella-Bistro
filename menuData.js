const rawMenuData = [
    { category: "Starters", name: "Dynamite Chicken", desc: "8 pieces crispy chicken with special dynamite sauce.", price: "Rs 999", featured: true },
    { category: "Starters", name: "Buffalo Wings", desc: "6 pieces wings with special buffalo sauce.", price: "Rs 899" },
    { category: "Starters", name: "Mayo Garlic Fries", desc: "6mm fries served with mayo garlic sauce.", price: "Rs 549" },
    { category: "Starters", name: "Mexican Nachos", desc: "Nachos with tomato salsa, cheese sauce & sour cream.", price: "Rs 1099", featured: true },
    { category: "Starters", name: "Peri Bite", desc: "Stuffed chilli with peri peri chicken & cheese sauce.", price: "Rs 799" },
    { category: "Starters", name: "Strip Chicken", desc: "Crispy coated chicken with honey mustard sauce.", price: "Rs 1089" },
    { category: "Starters", name: "Dynamite Prawn", desc: "Crispy fried prawn with special dynamite sauce.", price: "Rs 1099" },

    { category: "Pasta", name: "Fettuccine Alfredo", desc: "Fettuccine with grilled chicken & alfredo sauce.", price: "Rs 1395", featured: true },
    { category: "Pasta", name: "Mac & Cheese", desc: "Macaroni with vegetables & cheese sauce.", price: "Rs 1495" },
    { category: "Pasta", name: "Portofino Pasta", desc: "Spaghetti in spicy white sauce with chicken & mushrooms.", price: "Rs 1495" },

    { category: "Pizza", name: "Signature Supreme Pizza", desc: "Beef + chicken with special homemade pizza sauce.", price: "Rs 1595", featured: true },
    { category: "Pizza", name: "Pepperoni Pizza", desc: "Pepperoni with special pizza sauce & cheese.", price: "Rs 1595" },
    { category: "Pizza", name: "Fajita Pizza", desc: "Cajun chicken with Mexican vegetables & cheese.", price: "Rs 1595" },
    { category: "Pizza", name: "Margarita Pizza", desc: "Tomato sauce & cheese.", price: "Rs 1495" },

    { category: "Soups", name: "Corn Soup (Single)", desc: "Piping hot stock cooked traditional style.", price: "Rs 499" },
    { category: "Soups", name: "Hot and Sour Soup", desc: "For spice lovers, sour and hot taste.", price: "Rs 499" },
    { category: "Soups", name: "Cream of Chicken Soup", desc: "Served with chopped chicken & garlic bread.", price: "Rs 599" },
    { category: "Soups", name: "Thai Soup", desc: "Clear flavourful soup with Thai taste.", price: "Rs 499" },

    { category: "Salads", name: "Grilled Chicken Salad", desc: "Grilled chicken with cucumber, onion, lettuce & capsicum.", price: "Rs 1099" },
    { category: "Salads", name: "Caesar Salad", desc: "Iceberg with Caesar dressing, croutons & parmesan.", price: "Rs 999" },
    { category: "Salads", name: "Stella Bistro’s Signature Salad", desc: "Cucumber, lettuce, iceberg, cheese, tomatoes, shrimps & egg.", price: "Rs 999", featured: true },

    { category: "Steak", name: "Beef Medallion", desc: "Choice of sauce & sides available.", price: "Rs 1999" },
    { category: "Steak", name: "Filet Mignon", desc: "Choice of sauce & sides available.", price: "Rs 2195" },
    { category: "Steak", name: "Beef Skirt Steak", desc: "Choice of sauce & sides available.", price: "Rs 1949" },
    { category: "Steak", name: "Parmesan Crust Beef Medallion", desc: "Choice of sauce & sides available.", price: "Rs 2499", featured: true },

    { category: "Seafood", name: "Grilled Fish", desc: "Continental grilled fish with sautéed vegetables & lemon butter.", price: "Rs 3699" },
    { category: "Seafood", name: "Coriander Crust Fish", desc: "Fish with coriander crust, mustard creamy sauce & veggies.", price: "Rs 3699" },

    { category: "Sandwiches", name: "Stella Bistro’s Signature Sandwich", desc: "Chicken, cheese, egg & chef’s special sauce.", price: "Rs 1299" },
    { category: "Sandwiches", name: "Club Sandwich (Triple Decker)", desc: "Chicken, egg, cheese, lettuce, tomato & cucumber.", price: "Rs 1499" },
    { category: "Sandwiches", name: "Grilled Chicken Sandwich", desc: "Smoky chicken with lettuce, cucumber & tomato.", price: "Rs 1199" },
    { category: "Sandwiches", name: "Roast Beef Sandwich", desc: "Roasted beef with fresh lettuce, cucumber & tomato.", price: "Rs 1399" },
    { category: "Sandwiches", name: "Fillet Steak Sandwich", desc: "Beef julienne with mushroom sauce & cheese topping.", price: "Rs 1399" },

    { category: "Main Course (Chicken)", name: "Moroccan Chicken", desc: "Grilled chicken with sautéed vegetables & choice of sideline.", price: "Rs 1649", featured: true },
    { category: "Main Course (Chicken)", name: "Tarragon Chicken", desc: "Grilled chicken with sautéed vegetables & choice of sideline.", price: "Rs 1649" },
    { category: "Main Course (Chicken)", name: "Parmesan Chicken", desc: "Crumb fried chicken with marinara & parmesan.", price: "Rs 1649" },

    { category: "Burgers", name: "Stella Special Burger", desc: "Stuffed beef patty with potato bun & fries.", price: "Rs 1195", featured: true },
    { category: "Burgers", name: "Crispy Chicken Burger", desc: "Crispy patty with special sauce.", price: "Rs 1095" },
    { category: "Burgers", name: "Ultimate Chicken Burger", desc: "Chicken minced patty tossed with BBQ sauce.", price: "Rs 1295" },
    { category: "Burgers", name: "Classic Beef Burger", desc: "Beef minced patty with crunch of vegetables.", price: "Rs 1295" },
    { category: "Burgers", name: "Smashed Beef Burger", desc: "Smashed beef with homemade house special sauce.", price: "Rs 1495" },

    { category: "Handi", name: "Chicken Paneer Handi", desc: "Traditional handi style.", price: "Rs 2290" },
    { category: "Handi", name: "Chicken Makhni Handi", desc: "Traditional makhni style.", price: "Rs 2290" },

    { category: "Tandoor", name: "Roti", desc: "Fresh tandoor roti.", price: "Rs 49" },
    { category: "Tandoor", name: "Chapati", desc: "Fresh chapati.", price: "Rs 49" },
    { category: "Tandoor", name: "Garlic Nan", desc: "Garlic naan.", price: "Rs 99" },
    { category: "Tandoor", name: "Roghni Naan", desc: "Roghni naan.", price: "Rs 120" },
    { category: "Tandoor", name: "Poori Paratha", desc: "Poori paratha.", price: "Rs 180" },

    { category: "Dessert", name: "Brownie with Ice Cream", desc: "Classic dessert.", price: "Rs 499", featured: true },
    { category: "Dessert", name: "Coffee Rusk Delight", desc: "Signature delight.", price: "Rs 449" },
    { category: "Dessert", name: "3 Layers Oreo & Cream", desc: "Layered dessert.", price: "Rs 449" },
    { category: "Dessert", name: "3 Layers Lotus & Cream", desc: "Layered dessert.", price: "Rs 499" }
];

function generateSlug(text) {
    return text.toLowerCase()
        .trim()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Ensure unique slugs
const slugCounts = {};

const menuData = rawMenuData.map((item) => {
    let baseSlug = generateSlug(item.name);
    if (slugCounts[baseSlug]) {
        slugCounts[baseSlug]++;
        baseSlug = `${baseSlug}-${slugCounts[baseSlug]}`;
    } else {
        slugCounts[baseSlug] = 1;
    }

    return {
        ...item,
        id: baseSlug,
        slug: baseSlug,
        image: `assets/menu/${baseSlug}.webp`,
        categorySlug: generateSlug(item.category),
        tags: item.tags || []
    };
});

const categories = Array.from(new Set(menuData.map(item => item.category)))
    .map(name => ({
        name,
        slug: generateSlug(name)
    }));
