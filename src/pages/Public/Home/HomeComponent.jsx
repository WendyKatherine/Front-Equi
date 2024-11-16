import book1 from '../../../assets/img/book1.webp';
import book2 from '../../../assets/img/book2.webp';
import book3 from '../../../assets/img/book3.jpg';
import book4 from '../../../assets/img/book4.webp';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';


export const HomeComponent = () => {
  return (
    <>
      <div className="flex flex-row overflow-y-auto">
        <div className="w-[30%] p-8">
          <Typography variant='h1'>
          Happy reading,User</Typography>
          <Typography variant='body1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptatem repellendus, deleniti esse quibusdam et hic quia voluptatum asperiores.</Typography>
          <Button variant="outlined">Read More</Button>
        </div>
        <div className="w-[70%] p-8">
          <Typography variant='h2'> Book Recomentadation </Typography>
          <div className="flex flex-row">
            <div className="flex-1">
              <img src={ book1 } alt="" width="150px" />
            </div>
            <div className="flex-1">
              <img src={ book2 } alt="" width="150px" />
            </div>
            <div className="flex-1">
              <img src={ book3 } alt="" width="150px" />
            </div>
            <div className="flex-1">
              <img src={ book4 } alt="" width="150px" />
            </div>
          </div>
        </div>
      <div>

        </div>
      </div>
    </>
  )
}