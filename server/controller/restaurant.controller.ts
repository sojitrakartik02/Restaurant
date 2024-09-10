import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { Multer } from "multer";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Order } from "../models/order.model";

// export const createRestaurant = async (req: Request, res: Response) => {
//     console.log('Request Body:', req.body);
//     try {
//         const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
//         const file = req.file;
//         console.log('Request File:', req.file);
//         console.log("Data", { restaurantName, city, country, deliveryTime, cuisines })
//         if (!restaurantName) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Restaurant name is required"
//             });
//         }

//         if (!city) {
//             return res.status(400).json({
//                 success: false,
//                 message: "City is required"
//             });
//         }

//         if (!country) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Country is required"
//             });
//         }

//         if (!deliveryTime) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Delivery time is required"
//             });
//         }

//         if (!file) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Image is required"
//             });
//         }






//         const restaurant = await Restaurant.findOne({ user: req.id });
//         if (restaurant) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Restaurant already exist for this user"
//             })
//         }
//         if (!file) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Image is required"
//             })
//         }
//         const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
//         let parsedCuisines: String[];

//         if (Array.isArray(cuisines)) {
//             parsedCuisines = cuisines;
//         } else {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid cuisines format"
//             });
//         }


//         await Restaurant.create({
//             user: req.id,
//             restaurantName,
//             city,
//             country,
//             deliveryTime,
//             cuisines: parsedCuisines,
//             imageUrl
//         });


//         return res.status(201).json({
//             success: true,
//             message: "Restaurant Added"
//         });
//     } catch (error) {
//         console.log("Error in Creatign restaurant", error);
//         return res.status(500).json({ message: "Internal server error" })
//     }
// }



export const createRestaurant = async (req: Request, res: Response) => {
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);

    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;


        if (!restaurantName) {
            return res.status(400).json({
                success: false,
                message: "Restaurant name is required"
            });
        }

        if (!city) {
            return res.status(400).json({
                success: false,
                message: "City is required"
            });
        }

        if (!country) {
            return res.status(400).json({
                success: false,
                message: "Country is required"
            });
        }

        if (!deliveryTime) {
            return res.status(400).json({
                success: false,
                message: "Delivery time is required"
            });
        }

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }


        let parsedCuisines: string[];

        if (typeof cuisines === 'string') {
            parsedCuisines = JSON.parse(cuisines);
        } else if (Array.isArray(cuisines)) {
            parsedCuisines = cuisines;
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid cuisines format"
            });
        }

        const existingRestaurant = await Restaurant.findOne({ user: req.id });
        if (existingRestaurant) {
            return res.status(400).json({
                success: false,
                message: "Restaurant already exists for this user"
            });
        }

        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

        await Restaurant.create({
            user: req.id,
            restaurantName,
            city,
            country,
            deliveryTime,
            cuisines: parsedCuisines,
            imageUrl
        });

        return res.status(201).json({
            success: true,
            message: "Restaurant added successfully"
        });
    } catch (error) {
        console.log("Error in creating restaurant", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}










// export const createRestaurant = async (req: Request, res: Response) => {
//     console.log('Request Body:', req.body);
//     console.log('Request File:', req.file);

//     try {
//         const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
//         const file = req.file;

//         console.log('Parsed Details:', { restaurantName, city, country, deliveryTime, cuisines });
//         console.log('File Details:', file);

//         if (!restaurantName || !city || !country || !deliveryTime || !file) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All required fields must be provided, including image"
//             });
//         }

//         let parsedCuisines: string[] = [];
//         try {
//             parsedCuisines = Array.isArray(cuisines) ? cuisines : JSON.parse(cuisines);
//         } catch (error) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid cuisines format"
//             });
//         }

//         const existingRestaurant = await Restaurant.findOne({ user: req.id });
//         if (existingRestaurant) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Restaurant already exists for this user"
//             });
//         }

//         const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

//         await Restaurant.create({
//             user: req.id,
//             restaurantName,
//             city,
//             country,
//             deliveryTime,
//             cuisines: parsedCuisines,
//             imageUrl
//         });

//         return res.status(201).json({
//             success: true,
//             message: "Restaurant Added"
//         });
//     } catch (error) {
//         console.log("Error in creating restaurant:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }



// export const getRestaurant = async (req: Request, res: Response) => {
//     try {
//         const restaurant = await Restaurant.findOne({ user: req.id }).populate('menus');
//         if (!restaurant) {
//             return res.status(404).json({
//                 success: false,
//                 restaurant: [],
//                 message: "Restaurant not found"
//             })
//         };
//         return res.status(200).json({ success: true, restaurant });
//     } catch (error) {
//         console.error("Error fetching restaurant:", error);
//         return res.status(500).json({ message: "Internal server error" })
//     }
// }



export const getRestaurant = async (req: Request, res: Response) => {
    console.log("User ID from request:", req.id);
    try {
        const restaurant = await Restaurant.findOne({ user: req.id }).populate('menus');
        console.log("Fetched restaurant:", restaurant); // Log the fetched restaurant

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                restaurant: [],
                message: "Restaurant not found"
            });
        }

        return res.status(200).json({
            success: true,
            restaurant
        });
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



export const updateRestaurant = async (req: Request, res: Response) => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
        };
        restaurant.restaurantName = restaurantName;
        restaurant.city = city;
        restaurant.country = country;
        restaurant.deliveryTime = deliveryTime;
        restaurant.cuisines = JSON.parse(cuisines);

        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            restaurant.imageUrl = imageUrl;
        }
        await restaurant.save();
        return res.status(200).json({
            success: true,
            message: "Restaurant updated",
            restaurant
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const getRestaurantOrder = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
        };
        const orders = await Order.find({ restaurant: restaurant._id }).populate('restaurant').populate('user');
        return res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }
        order.status = status;
        await order.save();
        return res.status(200).json({
            success: true,
            status: order.status,
            message: "Status updated"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const searchRestaurant = async (req: Request, res: Response) => {
    try {
        const searchText = req.params.searchText || "";
        const searchQuery = req.query.searchQuery as string || "";
        const selectedCuisines = (req.query.selectedCuisines as string || "").split(",").filter(cuisine => cuisine);
        const query: any = {};
        // basic search based on searchText (name ,city, country)
        console.log(selectedCuisines);

        if (searchText) {
            query.$or = [
                { restaurantName: { $regex: searchText, $options: 'i' } },
                { city: { $regex: searchText, $options: 'i' } },
                { country: { $regex: searchText, $options: 'i' } },
            ]
        }
        // filter on the basis of searchQuery
        if (searchQuery) {
            query.$or = [
                { restaurantName: { $regex: searchQuery, $options: 'i' } },
                { cuisines: { $regex: searchQuery, $options: 'i' } }
            ]
        }
        // console.log(query);
        // ["momos", "burger"]
        if (selectedCuisines.length > 0) {
            query.cuisines = { $in: selectedCuisines }
        }

        const restaurants = await Restaurant.find(query);
        return res.status(200).json({
            success: true,
            data: restaurants
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const getSingleRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findById(restaurantId).populate({
            path: 'menus',
            options: { createdAt: -1 }
        });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
        };
        return res.status(200).json({ success: true, restaurant });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}