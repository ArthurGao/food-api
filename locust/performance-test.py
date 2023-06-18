import string
import random

from locust import HttpUser, task, between, tag


def get_random_string(length):
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str


def generate_random_numbers():
    random_int = random.randint(1, 100)  # Generate a random integer between 1 and 100
    random_decimal = random.random()  # Generate a random decimal between 0 and 1
    return random_int, random_decimal


class QuickstartUser(HttpUser):
    wait_time = between(1, 2)
    host = "http://localhost:3000"

    @task
    def get_all_food_items(self):
        self.client.get("/food?sortBy=price&sortOrder=DESC")

    @task
    def create_food_item(self):
        headers = {'Content-Type': 'application/json'}
        random_int, random_decimal = generate_random_numbers()

        food_dto = {  # replace with the actual FoodDto object
            'title': get_random_string(10),
            'description': get_random_string(20),
            'price': random_decimal,
            'quantity': random_int,
            # other fields...
        }
        self.client.post("/food", json=food_dto, headers=headers)

    @task
    def perform_food_action(self):
        headers = {'Content-Type': 'application/json'}
        random_int, random_decimal = generate_random_numbers()

        food_dto = {  # replace with the actual FoodDto object
            'title': get_random_string(10),
            'description': get_random_string(20),
            'price': random_decimal,
            'quantity': random_int,
            # other fields...
        }
        response = self.client.post("/food", json=food_dto, headers=headers)
        json_response = response.json()
        created_id = json_response['id']

        headers = {'Content-Type': 'application/json'}
        action_payload = {
            'action': 'buy',
            'quantity': random.randint(1, 5),  # generates a random integer between 1 and 5
        }
        self.client.patch(f"/food/{created_id}", json=action_payload, headers=headers)
