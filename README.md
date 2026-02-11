# gen-ai
StyleSense: Context-Aware Fashion Synthesis StyleSense is an intelligent recommendation engine developed for the GenAI Hackathon. It bridges the gap between static fashion catalogs and real-world environmental context, providing "Ground Truth" data for generative AI stylists.

🚀 The GenAI Track In the GenAI lifecycle, models often "hallucinate" recommendations that ignore physical constraints (e.g., suggesting a suit in 40°C weather). StyleSense solves this by providing a Deterministic Retrieval Layer.

Ground Truth: Our backend ensures 100% accuracy by mapping 120+ unique outfit profiles against real-time data.

LLM-Ready: This architecture is designed to be a "Custom Tool" for models like Gemini, providing the structured context needed for reliable RAG (Retrieval-Augmented Generation) workflows.

🛠️ Tech Stack Frontend: React.js (High-fidelity Charcoal & Gold UI)

Backend: Python Flask (Industry standard for AI/ML logic)

Intelligence: Weighted Scoring Decision Matrix

Data: Structured JSON Knowledge Base (120+ Style Profiles)

API Integration: Real-time Weather Data for environmental context

🧠 How it Works StyleSense uses a Weighted Attribute Logic to synthesize the perfect recommendation:

Input: User selects Gender, Occasion, and Budget.

Context: The system fetches real-time weather data based on the user's location.

Logic: The Python backend calculates a Match Score using specific weights:

Weather Match: 40%

Occasion Match: 40%

Budget Alignment: 20%

Output: The top-scoring outfit is delivered via a seamless JSON API to the React frontend.

📁 Repository Structure Plaintext ├── backend/ # Python Flask Logic & API ├── frontend/ # React.js User Interface ├── data/ # Knowledge Base (outfits.json) └── README.md # Project Documentation 👨‍💻 Installation & Demo To run this project locally for the demo:

Start the Backend: cd backend python app.py
Start the Frontend: cd frontend npm start
