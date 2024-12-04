import React from "react";

const About = () => {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
          About Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Section - Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1519666213630-9be6d6e74f05"
              alt="Books"
              className="rounded-lg shadow-lg object-cover w-full h-72"
            />
          </div>

          {/* Right Section - Content */}
          <div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to <span className="font-semibold text-blue-700">ThisBook</span>, your one-stop destination for exploring, purchasing, and
              cherishing your favorite books. We believe in the power of stories
              and knowledge, offering a wide range of books to readers of all
              interests and ages.
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              At <span className="font-semibold text-blue-700">ThisBook</span>, our mission is to make books accessible to everyone, ensuring
              that each reader finds something they love. From timeless classics
              to the latest bestsellers, our carefully curated collection is
              designed to inspire and educate.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to ignite the love for reading by offering a seamless
            and delightful shopping experience. We are committed to delivering
            exceptional service, quality books, and fostering a community of
            book lovers who share our passion for literature.
          </p>
        </div>

        {/* Vision Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            We envision a world where books are a gateway to endless learning,
            imagination, and personal growth. By bridging the gap between
            readers and stories, we aim to create a platform that fuels curiosity
            and broadens horizons.
          </p>
        </div>

        {/* Team Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                role: "Founder & CEO",
                image:
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
              },
              {
                name: "Jane Smith",
                role: "Chief Editor",
                image:
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
              },
              {
                name: "Emily Johnson",
                role: "Marketing Lead",
                image:
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-4 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-blue-700">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Thank you for being a part of the <span className="text-blue-700 font-semibold">ThisBook</span> journey. Happy
            reading!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
