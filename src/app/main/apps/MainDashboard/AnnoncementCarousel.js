// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
// import required modules
import { Autoplay } from 'swiper';
import 'swiper/css/autoplay';
import Button from '@material-ui/core/Button';

function AnnoncementCarousel({ announcement }) {

  return (
    <>
      <div >
        <Swiper
          autoplay
          // modules={[Scrollbar]}
          modules={[Autoplay]}
          className="rounded-6 py-28 relative h-160 text-white"
          style={{ background: '#ff445d' }}
        >

          <h3 className="absolute top-10 right-10" data-tour="first">Announcement</h3>
          {announcement?.length === 0 && <h4 className="absolute top-32 right-10">No announcement</h4>}
          {announcement &&
            announcement.map((item, index) => {
              console.log('item', item);
              return (
                <SwiperSlide key={item.id} className="py-40 px-16 text-right">
                  {item.message}
                </SwiperSlide>
              );
            })}
          <img
            className="absolute top-[50%]  left-10"
            src="https://d2t3zflm3wbahw.cloudfront.net/static/dashboard_new/images/announcement.svg"
            style={{ transform: 'translateY(-50%)' }}
          />
        </Swiper>
      </div>
    </>
  );
}

export default AnnoncementCarousel;
