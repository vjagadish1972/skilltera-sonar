import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import personImg from '../../Assets/person.jpg'
import touchImg from '../../Assets/touch.jpg'
import techImg from '../../Assets/techimage.svg'


const OurServices = () => {
    return (
        <>
            <div className='container'>
                <h1 className="text-center m-4" style={{ color: '#6f42c1' }}> OUR SERVICES</h1>
                <div className="d-flex justify-content-around">
                    <OurServicesCard serviceDetailId={1} title={'Custom software development'} cardImg={personImg} />
                    <OurServicesCard serviceDetailId={2}  title={'Professional engineering'} cardImg={touchImg} />
                    <OurServicesCard serviceDetailId={3}  title={'Product engineering'} cardImg={techImg} />
                </div>

                <ServicesDetails serviceDetailId={1} />
                <ServicesDetails serviceDetailId={2} />
                <ServicesDetails serviceDetailId={3} />
            </div>
        </>
    )
}

const OurServicesCard = ({ serviceDetailId , title , cardImg  }) => {
    const scrollToServiceDetail = () => {
        const serviceDetailElement = document.getElementById(`service-detail-${serviceDetailId}`);
        if (serviceDetailElement) {
            serviceDetailElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            <Card sx={{ maxWidth: 345 }} onClick={scrollToServiceDetail}>
                <CardMedia
                    sx={{ height: 140 }}
                     image={cardImg}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </>
    )
}

const ServicesDetails = ({ serviceDetailId }) => {
    return (
        <>
            <div className='m-4' id={`service-detail-${serviceDetailId}`}>
                <h1>Service Detail {serviceDetailId}</h1>
              <p>Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica </p>
            </div>
        </>
    )
}

export default OurServices;
