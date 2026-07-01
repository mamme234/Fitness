import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Exercise() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        api.get("/exercises")
            .then(res => setExercises(res.data.data));
    }, []);

    return (
        <div className="p-4 text-white">
            <h1>Exercises</h1>

            {exercises.map(ex => (
                <div key={ex._id} className="bg-gray-800 p-3 my-2">
                    <h2>{ex.name}</h2>
                    <p>{ex.muscleGroup}</p>
                </div>
            ))}
        </div>
    );
}
