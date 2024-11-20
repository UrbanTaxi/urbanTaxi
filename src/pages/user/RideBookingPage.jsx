import React, { useState, useEffect } from 'react';

const RideBookingPage = () => {
    // State for pickup, drop-off locations, ride type, and pricing estimate
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [rideType, setRideType] = useState('Standard');
    const [priceEstimate, setPriceEstimate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Mock function to simulate fetching price estimate (would normally use API)
    const fetchPriceEstimate = async () => {
        setIsLoading(true);
        try {
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // Setting a mock price estimate based on ride type
            setPriceEstimate(rideType === 'Standard' ? 15 : rideType === 'Premium' ? 25 : 40);
        } catch (err) {
            setError("Failed to fetch price estimate. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch price estimate when ride type changes
    useEffect(() => {
        if (pickupLocation && dropoffLocation) {
            fetchPriceEstimate();
        }
    }, [rideType, pickupLocation, dropoffLocation]);

    // Handler for location input changes
    const handleLocationChange = (e, setLocation) => {
        setLocation(e.target.value);
    };

    // Form submission handler
    const handleConfirmBooking = () => {
        if (!pickupLocation || !dropoffLocation) {
            setError("Please enter both pickup and drop-off locations.");
            return;
        }
        console.log("Booking confirmed with:", {
            pickupLocation,
            dropoffLocation,
            rideType,
            priceEstimate
        });
        // Proceed with booking logic here (e.g., API call)
    };

    return (
        <div className="ride-booking-page p-6">
            <h2 className="text-2xl font-bold mb-4">Book Your Ride</h2>

            {/* Location Selection */}
            <div className="location-inputs mb-4">
                <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => handleLocationChange(e, setPickupLocation)}
                    placeholder="Pickup Location"
                    className="border rounded p-2 w-full mb-2"
                />
                <input
                    type="text"
                    value={dropoffLocation}
                    onChange={(e) => handleLocationChange(e, setDropoffLocation)}
                    placeholder="Drop-off Location"
                    className="border rounded p-2 w-full"
                />
            </div>

            {/* Ride Options */}
            <div className="ride-options mb-4">
                <label className="block font-semibold mb-2">Select Ride Type:</label>
                <select
                    value={rideType}
                    onChange={(e) => setRideType(e.target.value)}
                    className="border rounded p-2 w-full"
                >
                    <option value="Standard">Standard - Basic Ride</option>
                    <option value="Premium">Premium - Comfort Ride</option>
                    <option value="XL">XL - Larger Vehicle</option>
                </select>
            </div>

            {/* Price Estimate */}
            <div className="price-estimate mb-4">
                {isLoading ? (
                    <p>Loading price estimate...</p>
                ) : priceEstimate !== null ? (
                    <p>Estimated Fare: ${priceEstimate}</p>
                ) : (
                    <p className="text-gray-500">Enter locations to get an estimate</p>
                )}
            </div>

            {/* Confirm Booking */}
            <button
                onClick={handleConfirmBooking}
                className="bg-blue-500 text-white p-2 rounded w-full"
            >
                Confirm Booking
            </button>

            {/* Error Message */}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default RideBookingPage;
