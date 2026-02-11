import json
import os

def get_outfit(user_data):
    # Get the absolute path to your JSON file
    path = os.path.join(os.path.dirname(__file__), '../data/outfits.json')
    
    with open(path, 'r') as f:
        outfits = json.load(f)

    best_match = None
    highest_score = -1

    for item in outfits:
        score = 0
        
        # 1. Gender MUST match (Base requirement)
        if item.get('gender') != user_data.get('gender'):
            continue
        
        # 2. Add points for matching Occasion (High Priority)
        if item.get('occasion') == user_data.get('occasion'):
            score += 10
            
        # 3. Add points for matching Season (Weather Priority)
        if item.get('season') == user_data.get('season'):
            score += 7
            
        # 4. Add points for matching Budget
        if item.get('budget') == user_data.get('budget'):
            score += 5

        # Update the best match if this score is the highest so far
        if score > highest_score:
            highest_score = score
            best_match = item

    # If no gender match at all, return the first item in the list as a safety
    return best_match if best_match else outfits[0]