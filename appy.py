from flask import Flask, render_template, request, jsonify
import pickle

app = Flask(__name__)

# Load the pickled machine learning model
with open('DecisionTree_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Define the route to render the index.html file
@app.route('/')
def index():
    return render_template('index.html')
from flask import Flask, render_template, request
import pickle

# Load the pickled model
model = pickle.load(open("model.pkl", "rb"))

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")  # Replace with your HTML file name

@app.route("/predict", methods=["POST"])
def predict():
    # Get user input from the form
    data = request.form

    # Prepare data for prediction (assuming your model expects specific format)
    # This part might need adjustments depending on your model
    features = [float(data["feature1"]), float(data["feature2"])]  # Example

    # Make prediction using the loaded model
    prediction = model.predict([features])[0]

    # Set the score variable based on prediction
    score = "High" if prediction == 1 else "Low"

    return render_template("index.html", score=score)  # Update the template

if __name__ == "__main__":
    app.run(debug=True)
