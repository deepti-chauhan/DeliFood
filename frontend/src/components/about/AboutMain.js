import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBurger,
  faHeart,
  faPizzaSlice,
  faSeedling,
} from '@fortawesome/free-solid-svg-icons'
import './AboutMain.css'
const AboutMain = () => {
  return (
    <>
      <div className='about-container'>
        <div className='about-content flex-center'>
          <h2>OUR STORY</h2>
          <p>
            <i>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vehicula risus ac lacus sagittis, eget viverra justo euismod.
              Fusce eu neque eget eros tincidunt interdum. Fusce justo massa,
              pulvinar sed molestie sed, semper iaculis sapien. Curabitur vitae
              velit auctor, viverra risus id, maximus magna. Nunc id ultricies
              quam. Interdum et malesuada fames ac ante ipsum primis in
              faucibus. In ultrices commodo pellentesque. Duis pulvinar, mi ac
              iaculis venenatis, enim tellus ultrices nisl, id auctor lectus
              justo et ipsum.
            </i>
          </p>
        </div>
        <div className='about-content-img ' id='img1'></div>
        <div className='about-content-img' id='img2'></div>
        <div className='about-content flex-center'>
          <h2>OUR STORY</h2>
          <p>
            <i>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vehicula risus ac lacus sagittis, eget viverra justo euismod.
              Fusce eu neque eget eros tincidunt interdum. Fusce justo massa,
              pulvinar sed molestie sed, semper iaculis sapien. Curabitur vitae
              velit auctor, viverra risus id, maximus magna. Nunc id ultricies
              quam. Interdum et malesuada fames ac ante ipsum primis in
              faucibus. In ultrices commodo pellentesque. Duis pulvinar, mi ac
              iaculis venenatis, enim tellus ultrices nisl, id auctor lectus
              justo et ipsum.
            </i>
          </p>
        </div>
      </div>

      {/* <div className='about-content-2'></div> */}
      <div className='about-content-4 flex-center'>
        <div>
          <img src='./assets/about_assets/img-1.webp' width='400' />
          <span className='flex-center'>
            <FontAwesomeIcon icon={faBurger} className='about-icon' />

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vehicula risus ac lacus sagittis, eget viverra justo euismod.
              Fusce eu neque eget eros tincidunt interdum. Fusce justo massa,
              pulvinar sed molestie sed, semper iaculis sapien. Curabitur vitae
              velit auctor, viverra risus id, maximus magna. Nunc id ultricies
              quam. Interdum et malesuada fames ac ante ipsum primis in
              faucibus.In ultrices commodo pellentesque. Duis pulvinar, mi ac
              iaculis venenatis, enim tellus ultrices nisl, id auctor lectus
              justo et ipsum.
            </p>
          </span>
          <img src='./assets/about_assets/img-7.webp' width='400' />
          <span className='flex-center'>
            <FontAwesomeIcon icon={faSeedling} className='about-icon' />

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vehicula risus ac lacus sagittis, eget viverra justo euismod.
              Fusce eu neque eget eros tincidunt interdum. Fusce justo massa,
              pulvinar sed molestie sed, semper iaculis sapien. Curabitur vitae
              velit auctor, viverra risus id, maximus magna. Nunc id ultricies
              quam. Interdum et malesuada fames ac ante ipsum primis in
              faucibus.In ultrices commodo pellentesque. Duis pulvinar, mi ac
              iaculis venenatis, enim tellus ultrices nisl, id auctor lectus
              justo et ipsum.
            </p>
          </span>
          <img src='./assets/about_assets/img-8.webp' width='400' />
          <span className='flex-center'>
            <FontAwesomeIcon icon={faPizzaSlice} className='about-icon' />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vehicula risus ac lacus sagittis, eget viverra justo euismod.
              Fusce eu neque eget eros tincidunt interdum. Fusce justo massa,
              pulvinar sed molestie sed, semper iaculis sapien. Curabitur vitae
              velit auctor, viverra risus id, maximus magna. Nunc id ultricies
              quam. Interdum et malesuada fames ac ante ipsum primis in
              faucibus.In ultrices commodo pellentesque. Duis pulvinar, mi ac
              iaculis venenatis, enim tellus ultrices nisl, id auctor lectus
              justo et ipsum.
            </p>
          </span>
        </div>
      </div>
    </>
  )
}

export default AboutMain
