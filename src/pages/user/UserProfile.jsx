import React, { useState, useEffect } from 'react';

const UserProfile = () => {
    // State for user data and edit mode
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        profilePicture: '',
    });
    const [rideHistory, setRideHistory] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);

    // Load user data and ride history on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/user-profile');
                const data = await response.json();
                setUser(data.user);
                setRideHistory(data.rideHistory);
            } catch (err) {
                setError("Failed to load user data.");
            }
        };

        fetchUserData();
    }, []);

    // Toggle edit mode
    const toggleEdit = () => setIsEditing(!isEditing);

    // Handler for updating profile information
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/update-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
            if (response.ok) {
                setIsEditing(false);
            } else {
                setError("Failed to update profile.");
            }
        } catch (err) {
            setError("An error occurred during profile update.");
        }
    };

    return (
        <div className="user-profile">
            <div className="profile-info bg-white p-6 rounded shadow">
                <div className="flex items-center space-x-4">
                    <img 
                        src={user.profilePicture || '/default-profile.png'}
                        alt="Profile"
                        className="w-20 h-20 rounded-full"
                    />
                    <button onClick={toggleEdit} className="text-blue-500">Edit Profile</button>
                </div>

                {isEditing ? (
                    <form onSubmit={handleUpdate} className="space-y-4 mt-4">
                        <input
                            type="text"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            placeholder="Name"
                            className="border rounded p-2 w-full"
                        />
                        <input
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Email"
                            className="border rounded p-2 w-full"
                        />
                        <input
                            type="text"
                            value={user.phone}
                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                            placeholder="Phone"
                            className="border rounded p-2 w-full"
                        />
                        {error && <p className="text-red-500">{error}</p>}
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Changes</button>
                    </form>
                ) : (
                    <div className="mt-4">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                    </div>
                )}
            </div>

            <div className="ride-history mt-8">
                <h2 className="text-lg font-bold">Ride History</h2>
                <ul className="mt-4 space-y-2">
                    {rideHistory.map((ride) => (
                        <li key={ride.id} className="p-4 bg-gray-100 rounded shadow">
                            <p><strong>Pickup:</strong> {ride.pickup}</p>
                            <p><strong>Drop-off:</strong> {ride.dropOff}</p>
                            <p><strong>Date:</strong> {new Date(ride.date).toLocaleDateString()}</p>
                            <p><strong>Fare:</strong> ${ride.fare}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserProfile;
