import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">💪 Gym Pro</h1>

            <div className="flex gap-4">
                <Link to="/">Home</Link>
                <Link to="/workout">Workout</Link>
                <Link to="/exercises">Exercises</Link>
                <Link to="/progress">Progress</Link>
                <Link to="/nutrition">Nutrition</Link>
            </div>
        </nav>
    );
              }
