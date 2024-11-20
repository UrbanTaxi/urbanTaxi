import React, { useState } from 'react';

const DriverSignup = () => {
    // State for driver information, vehicle information, role, and documents
    const [driverInfo, setDriverInfo] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
    });
    const [vehicleInfo, setVehicleInfo] = useState({
        make: '',
        model: '',
        year: '',
        licensePlate: '',
    });
    const [role, setRole] = useState('Project Owner');
    const [documents, setDocuments] = useState({
        license: null,
        registration: null,
        insurance: null,
    });
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handler for input changes
    const handleInputChange = (e, setInfo) => {
        const { name, value } = e.target;
        setInfo((prev) => ({ ...prev, [name]: value }));
    };

    // Handler for document uploads
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setDocuments((prev) => ({ ...prev, [name]: files[0] }));
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!driverInfo.fullName || !driverInfo.email || !driverInfo.phone || !driverInfo.password || 
            !vehicleInfo.make || !vehicleInfo.model || !vehicleInfo.year || !vehicleInfo.licensePlate) {
            setError("Please complete all required fields.");
            return;
        }

        setIsSubmitting(true);

        // Construct FormData for sending file uploads
        const formData = new FormData();
        formData.append('fullName', driverInfo.fullName);
        formData.append('email', driverInfo.email);
        formData.append('phone', driverInfo.phone);
        formData.append('password', driverInfo.password);
        formData.append('make', vehicleInfo.make);
        formData.append('model', vehicleInfo.model);
        formData.append('year', vehicleInfo.year);
        formData.append('licensePlate', vehicleInfo.licensePlate);
        formData.append('role', role);
        formData.append('license', documents.license);
        formData.append('registration', documents.registration);
        formData.append('insurance', documents.insurance);

        try {
            const response = await fetch('/api/driver-signup', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log("Driver registration successful");
            } else {
                setError("Failed to register. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="driver-signup">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-bold">Driver Signup</h2>
                
                {/* Personal Information */}
                <input
                    type="text"
                    name="fullName"
                    value={driverInfo.fullName}
                    onChange={(e) => handleInputChange(e, setDriverInfo)}
                    placeholder="Full Name"
                    className="border rounded p-2 w-full"
                />
                <input
                    type="email"
                    name="email"
                    value={driverInfo.email}
                    onChange={(e) => handleInputChange(e, setDriverInfo)}
                    placeholder="Email"
                    className="border rounded p-2 w-full"
                />
                <input
                    type="text"
                    name="phone"
                    value={driverInfo.phone}
                    onChange={(e) => handleInputChange(e, setDriverInfo)}
                    placeholder="Phone Number"
                    className="border rounded p-2 w-full"
                />
                <input
                    type="password"
                    name="password"
                    value={driverInfo.password}
                    onChange={(e) => handleInputChange(e, setDriverInfo)}
                    placeholder="Password"
                    className="border rounded p-2 w-full"
                />

                {/* Vehicle Information */}
                <input
                    type="text"
                    name="make"
                    value={vehicleInfo.make}
                    onChange={(e) => handleInputChange(e, setVehicleInfo)}
                    placeholder="Vehicle Make"
                    className="border rounded p-2 w-full"
                />
                <input
                    type="text"
                    name="model"
                    value={vehicleInfo.model}
                    onChange={(e) => handleInputChange(e, setVehicleInfo)}
                    placeholder="Vehicle Model"
                    className="border rounded p-2 w-full"
                />
                <input
                    type="text"
                    name="year"
                    value={vehicleInfo.year}
                    onChange={(e) => handleInputChange(e, setVehicleInfo)}
                    placeholder="Year"
                    className="border rounded p-2 w-full"
                />
                <input
                    type="text"
                    name="licensePlate"
                    value={vehicleInfo.licensePlate}
                    onChange={(e) => handleInputChange(e, setVehicleInfo)}
                    placeholder="License Plate"
                    className="border rounded p-2 w-full"
                />

                {/* Role Selection */}
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border rounded p-2 w-full"
                >
                    <option value="Project Owner">Project Owner</option>
                    <option value="Project Regulator">Project Regulator</option>
                </select>

                {/* Document Uploads */}
                <label className="block">
                    <span>Driver's License</span>
                    <input type="file" name="license" onChange={handleFileChange} className="mt-2" />
                </label>
                <label className="block">
                    <span>Vehicle Registration</span>
                    <input type="file" name="registration" onChange={handleFileChange} className="mt-2" />
                </label>
                <label className="block">
                    <span>Insurance</span>
                    <input type="file" name="insurance" onChange={handleFileChange} className="mt-2" />
                </label>

                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Sign Up as Driver'}
                </button>
            </form>
        </div>
    );
};

export default DriverSignup;
