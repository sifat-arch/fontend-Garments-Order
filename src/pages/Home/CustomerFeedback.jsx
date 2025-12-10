import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Khan",
    image: "https://i.pravatar.cc/150?img=45",
    rating: 5,
    text: "Amazing quality! The fabric feels premium and delivery was fast.",
  },
  {
    name: "Rafiul Hasan",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 4,
    text: "Color and fitting both are perfect. Highly recommended!",
  },
  {
    name: "Mahin Chowdhury",
    image: "https://i.pravatar.cc/150?img=25",
    rating: 5,
    text: "Great service and very comfortable outfit. Will order again!",
  },
  {
    name: "Mahin Chowdhury",
    image: "https://i.pravatar.cc/150?img=25",
    rating: 5,
    text: "Great service and very comfortable outfit. Will order again!",
  },
  {
    name: "Mahin Chowdhury",
    image: "https://i.pravatar.cc/150?img=25",
    rating: 5,
    text: "Great service and very comfortable outfit. Will order again!",
  },
  {
    name: "Mahin Chowdhury",
    image: "https://i.pravatar.cc/150?img=25",
    rating: 5,
    text: "Great service and very comfortable outfit. Will order again!",
  },
];

export default function CustomerFeedback() {
  return (
    <section className="py-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">
        What Our Customers Say
      </h2>

      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-6xl mx-auto px-4"
      >
        {reviews.map((review, i) => (
          <SwiperSlide key={i}>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-200">
              {/* Profile section */}
              <div className="flex items-center gap-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover border"
                />
                <div>
                  <h4 className="font-bold text-lg">{review.name}</h4>
                  <div className="flex text-yellow-500">
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star key={idx} size={18} fill="gold" stroke="none" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Review text */}
              <p className="text-gray-600 mt-4 italic">"{review.text}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
