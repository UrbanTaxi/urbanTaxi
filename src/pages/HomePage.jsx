import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero bg-cover bg-center text-white p-10" style={{ backgroundImage: "url('/path-to-hero-image.jpg')" }}>
                <h1 className="text-4xl font-bold mb-4">Get a Ride Anywhere, Anytime</h1>
                <p className="text-lg mb-6">Reliable rides at your fingertips.</p>
                <Link to="/ride-request" className="bg-blue-500 text-white px-6 py-2 rounded shadow">
                    Book a Ride Now
                </Link>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works p-10 bg-gray-100 text-center">
                <h2 className="text-2xl font-bold mb-6">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="step">
                        <img src="/path-to-icon1.png" alt="Step 1" className="mx-auto mb-2" />
                        <h3 className="font-semibold">Request a Ride</h3>
                        <p>Choose your pickup and drop-off locations.</p>
                    </div>
                    <div className="step">
                        <img src="/path-to-icon2.png" alt="Step 2" className="mx-auto mb-2" />
                        <h3 className="font-semibold">Get Matched</h3>
                        <p>We’ll connect you with the nearest available driver.</p>
                    </div>
                    <div className="step">
                        <img src="/path-to-icon3.png" alt="Step 3" className="mx-auto mb-2" />
                        <h3 className="font-semibold">Enjoy Your Ride</h3>
                        <p>Sit back and enjoy a safe, smooth ride to your destination.</p>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits p-10 text-center">
                <h2 className="text-2xl font-bold mb-6">Why Choose Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="benefit">
                        <img src="/path-to-icon4.png" alt="Affordable Rates" className="mx-auto mb-2" />
                        <h3 className="font-semibold">Affordable Rates</h3>
                        <p>We offer competitive pricing for all your trips.</p>
                    </div>
                    <div className="benefit">
                        <img src="/path-to-icon5.png" alt="Fast and Reliable" className="mx-auto mb-2" />
                        <h3 className="font-semibold">Fast and Reliable</h3>
                        <p>Our drivers are always ready to take you where you need to go.</p>
                    </div>
                    <div className="benefit">
                        <img src="/path-to-icon6.png" alt="Safety First" className="mx-auto mb-2" />
                        <h3 className="font-semibold">Safety First</h3>
                        <p>Your safety is our top priority with verified drivers and monitored rides.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials p-10 bg-gray-100 text-center">
                <h2 className="text-2xl font-bold mb-6">What Our Customers Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="testimonial p-4 bg-white shadow rounded">
                        <p>"Best ride service ever! Affordable and always on time."</p>
                        <p className="mt-2 text-sm text-gray-500">- Alex G.</p>
                    </div>
                    <div className="testimonial p-4 bg-white shadow rounded">
                        <p>"I feel safe knowing the drivers are verified."</p>
                        <p className="mt-2 text-sm text-gray-500">- Jessica P.</p>
                    </div>
                </div>
            </section>

            {/* Driver Signup Prompt */}
            <section className="driver-signup-prompt p-10 text-center bg-blue-500 text-white">
                <h2 className="text-2xl font-bold mb-4">Become a Driver</h2>
                <p>Join our team of drivers and earn on your schedule.</p>
                <Link to="/driver-signup" className="bg-white text-blue-500 px-6 py-2 mt-4 inline-block rounded shadow">
                    Sign Up as Driver
                </Link>
            </section>

            {/* Footer */}
            <footer className="footer p-6 bg-gray-800 text-white text-center">
                <p>&copy; {new Date().getFullYear()} RideApp. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-4">
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact Us</Link>
                    <Link to="/faq">FAQ</Link>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
