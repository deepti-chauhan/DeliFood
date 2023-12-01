import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBurger,
  faPizzaSlice,
  faSeedling,
} from '@fortawesome/free-solid-svg-icons'
import './AboutMain.css'
import env from 'react-dotenv'
const AboutMain = () => {
  return (
    <>
      <div className='about-content-4 flex-center'>
        <div>
          {/* <img src={`${env.BASE_URL}/img/img-1.webp`} width='400' /> */}
          <img src={`./assets/about_assets/img-1.webp`} width='400' />
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
          {/* <img src={`${env.BASE_URL}/img/img-7.webp`} width='400' /> */}
          <img src={`./assets/about_assets/img-7.webp`} width='400' />

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
          {/* <img src={`${env.BASE_URL}/img/img-8.webp`} width='400' /> */}
          <img src={`./assets/about_assets/img-8.webp`} width='400' />

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
