export default function ChallengeCard({ challenge }) {
    return (
        <div className="bg-gray-900 p-3 rounded text-white my-2">
            <h2 className="font-bold">{challenge.title}</h2>
            <p>Target: {challenge.targetValue}</p>

            <button className="bg-green-600 px-3 py-1 mt-2 rounded">
                Join
            </button>
        </div>
    );
}
