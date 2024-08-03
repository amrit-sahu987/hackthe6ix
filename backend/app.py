from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Sample data
meals = [
    {'id': 1, 'name': 'Spaghetti', 'allergens': ['gluten', 'dairy']},
    {'id': 2, 'name': 'Grilled Chicken', 'allergens': []},
    {'id': 3, 'name': 'Sushi', 'allergens': ['fish']},
    {'id': 4, 'name': 'Caesar Salad', 'allergens': ['dairy']},
    {'id': 5, 'name': 'Vegan Burger', 'allergens': ['gluten']}
]

@app.route('/api/search', methods=['GET'])
def search_meals():
    query = request.args.get('q', '')
    allergens = request.args.getlist('allergens')

    filtered_meals = [meal for meal in meals if query.lower() in meal['name'].lower()]

    if allergens:
        filtered_meals = [
            meal for meal in filtered_meals
            if not any(allergen in meal['allergens'] for allergen in allergens)
        ]

    return jsonify(filtered_meals)

@app.route('/api/autocomplete', methods=['GET'])
def autocomplete():
    query = request.args.get('q', '').lower()
    suggestions = [meal['name'] for meal in meals if query in meal['name'].lower()]
    return jsonify(suggestions)

if __name__ == '__main__':
    app.run(debug=True)
