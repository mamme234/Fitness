import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Progress() {
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        api.get("/progress/history")
            .then(res => setProgress(res.data.data));
    }, []);

    return (
        <div className="p-4 text-white">
            <h1>📊 Progress</h1>

            {progress.map(p => (
                <div key={p._id} className="bg-gray-800 p-3 my-2">
                    <p>Weight: {p.weight}</p>
                    <p>BMI: {p.bmi}</p>
                </div>
            ))}
        </div>
    );
}
