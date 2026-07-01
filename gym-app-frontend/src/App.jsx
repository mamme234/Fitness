import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Workout from "./pages/Workout";
import Exercise from "./pages/Exercise";
import Challenges from "./pages/Challenges";
import Progress from "./pages/Progress";
import Nutrition from "./pages/Nutrition";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/workout" element={<Workout />} />
                <Route path="/exercises" element={<Exercise />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/nutrition" element={<Nutrition />} />
            </Routes>
        </BrowserRouter>
    );
          }
