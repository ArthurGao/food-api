export declare class FoodController {
    getAllFoodItems(): {
        message: string;
    };
    searchFoodItems(title: string, description: string, quantity: number): {
        message: string;
    };
    getFoodItemById(id: string): {
        message: string;
    };
    buyFoodItem(id: string, quantity: number): {
        message: string;
    };
}
