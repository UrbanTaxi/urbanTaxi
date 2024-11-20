import React, { useState } from 'react';

const RideRequest = () => {
    // State to hold input values
    const [pickup, setPickup] = useState('');
    const [dropOff, setDropOff] = useState('');
    const [rideType, setRideType] = useState('standard');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState(null);

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!pickup || !dropOff) {
            setError("Please fill out both pickup and drop-off locations.");
            return;
        }

        try {
            const response = await fetch('/api/ride-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pickup, dropOff, rideType, notes })
            });

            if (response.ok) {
                // Handle successful request, like redirecting or showing confirmation
                console.log("Ride request submitted successfully");
            } else {
                setError("Failed to submit ride request");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="ride-request-form">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Pickup Location"
                    className="border rounded p-2"
                />
                <input
                    type="text"
                    value={dropOff}
                    onChange={(e) => setDropOff(e.target.value)}
                    placeholder="Drop-off Location"
                    className="border rounded p-2"
                />
                <select
                    value={rideType}
                    onChange={(e) => setRideType(e.target.value)}
                    className="border rounded p-2"
                >
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="pool">Pool</option>
                </select>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Additional Notes (optional)"
                    className="border rounded p-2"
                />
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Request Ride
                </button>
            </form>
        </div>
    );
};

export default RideRequest;
