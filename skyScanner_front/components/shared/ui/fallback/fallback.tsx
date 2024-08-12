
import ErrorImage from '@/public/errorImage.svg'

import './fallback.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export const Fallback = () => {



    return (
        <div role='alert' className='fallback'>
            <Image src={ErrorImage} alt='image'/>
            <h1 className='fallback__img'>Something went wrong</h1>
            <Link href={'/'} className='fallback__link'>
                Go to home page
            </Link>
        </div>
    )
}
